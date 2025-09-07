package com.exxeta;

import com.exxeta.dataaccessobject.RoomRepository;
import com.exxeta.datatransferobject.RoomDTO;
import com.exxeta.datatransferobject.RoomPatchDTO;
import com.exxeta.domainobject.RoomDO;
import com.exxeta.domainvalue.RoomType;
import com.exxeta.exception.NotFoundException;
import com.exxeta.service.RoomService;
import com.exxeta.service.RoomServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class RoomServiceImplTest {

    private RoomRepository repo;
    private RoomService service;

    @BeforeEach
    void setUp() {
        repo = mock(RoomRepository.class);
        // RoomServiceImpl is package-private; test is in same package so this is fine:
        service = new RoomServiceImpl(repo);
    }

    // --- Helper methods ---
    private RoomDO createRoomDO(int number, RoomType type, boolean minibar, boolean available) {
        RoomDO e = new RoomDO();
        e.setNumber(number);
        e.setType(type);
        e.setHasMinibar(minibar);
        e.setAvailable(available);
        return e;
    }

    private RoomDTO createRoomDTO(int number, RoomType type, boolean minibar, boolean available) {
        return new RoomDTO(number, type, minibar, available);
    }

    @Test
    @DisplayName("Returns all rooms in the response when no filters are applied")
    void list_returnsAllRoomsResponseWithoutFilters() {
        RoomDO room1 = createRoomDO(101, RoomType.DOUBLE, true, true);
        RoomDO room2 = createRoomDO(102, RoomType.SINGLE, false, false);
        when(repo.findByFilters(null, null, null, PageRequest.of(0, 20)))
                .thenReturn(new PageImpl<>(List.of(room1, room2)));

        Page<RoomDTO> response = service.list(null, null, null, PageRequest.of(0, 20));

        assertThat(response.getTotalElements()).isEqualTo(2);
        assertThat(response.getContent().get(0).number()).isEqualTo(101);
        assertThat(response.getContent().get(1).number()).isEqualTo(102);
        verify(repo).findByFilters(null, null, null, PageRequest.of(0, 20));
    }

    @Test
    @DisplayName("Returns the correct response for an existing room number")
    void getByNumber_existing_returnsResponse() {
        RoomDO e = createRoomDO(202, RoomType.SINGLE, false, true);
        when(repo.findByNumber(202)).thenReturn(Optional.of(e));
        RoomDTO response = service.getByNumber(202);
        assertThat(response.number()).isEqualTo(202);
        assertThat(response.type()).isEqualTo(RoomType.SINGLE);
        verify(repo).findByNumber(202);
    }

    @Test
    @DisplayName("Throws NotFoundException when room number does not exist")
    void getByNumber_missing_throwsNotFound() {
        when(repo.findByNumber(999)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> service.getByNumber(999))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining("999");
        verify(repo).findByNumber(999);
    }

    @Test
    @DisplayName("Returns the response for a newly created room")
    void create_returnsResponseForNewRoom() {
        RoomDTO req = createRoomDTO(303, RoomType.SUITE, false, true);
        ArgumentCaptor<RoomDO> savedCaptor = ArgumentCaptor.forClass(RoomDO.class);
        RoomDO persisted = createRoomDO(303, RoomType.SUITE, false, true);
        when(repo.save(any(RoomDO.class))).thenReturn(persisted);
        RoomDTO response = service.create(req);
        verify(repo).save(savedCaptor.capture());
        RoomDO toSave = savedCaptor.getValue();
        assertThat(toSave.getNumber()).isEqualTo(303);
        assertThat(response.number()).isEqualTo(303);
        assertThat(response.type()).isEqualTo(RoomType.SUITE);
    }

    @Test
    @DisplayName("Returns the response after updating an existing room")
    void update_returnsResponseAfterUpdate() {
        RoomDO existing = createRoomDO(404, RoomType.SINGLE, false, false);
        when(repo.findByNumber(404)).thenReturn(Optional.of(existing));
        RoomDO persisted = createRoomDO(404, RoomType.DOUBLE, true, true);
        when(repo.save(any(RoomDO.class))).thenReturn(persisted);
        RoomDTO req = createRoomDTO(404, RoomType.DOUBLE, true, true);
        RoomDTO response = service.update(404, req);
        verify(repo).save(existing);
        assertThat(existing.getType()).isEqualTo(RoomType.DOUBLE);
        assertThat(response.number()).isEqualTo(404);
        assertThat(response.type()).isEqualTo(RoomType.DOUBLE);
    }

    @Test
    @DisplayName("Marks a room as deleted in the response when deleting by number")
    void delete_marksEntityAsDeletedAndSaves() {
        RoomDO existing = createRoomDO(505, RoomType.SINGLE, false, true);
        when(repo.findByNumber(505)).thenReturn(Optional.of(existing));
        service.delete(505);
        verify(repo).save(existing);
        assertThat(existing.getDeletedAt()).isNotNull();
    }

    @Test
    @DisplayName("Throws exception when updating room number to an existing one")
    void update_throwsExceptionWhenRoomNumberExists() {

        RoomDO existingRoom = createRoomDO(101, RoomType.DOUBLE, true, true);
        RoomDO otherRoom = createRoomDO(102, RoomType.SINGLE, false, true);
        RoomDTO updateRequest = createRoomDTO(102, RoomType.DOUBLE, true, true); // Try to update 101 to 102

        when(repo.findByNumber(101)).thenReturn(Optional.of(existingRoom));
        when(repo.findByNumber(102)).thenReturn(Optional.of(otherRoom));

        assertThatThrownBy(() -> service.update(101, updateRequest))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessageContaining("Room number 102 already exists");
    }

    @Test
    @DisplayName("Throws exception when creating a room with an existing number")
    void create_throwsExceptionIfRoomNumberExists() {
        int duplicateNumber = 101;
        RoomDTO newRoom = createRoomDTO(duplicateNumber, RoomType.DOUBLE, true, true);
        RoomDO existingRoom = createRoomDO(duplicateNumber, RoomType.DOUBLE, true, true);
        when(repo.findByNumber(duplicateNumber)).thenReturn(Optional.of(existingRoom));

        assertThatThrownBy(() -> service.create(newRoom))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessageContaining("Room number " + duplicateNumber + " already exists");

        verify(repo, never()).save(any());
    }

    @Test
    @DisplayName("Updates only hasMinibar field with patch")
    void patch_updatesOnlyHasMinibar() {
        RoomDO existing = createRoomDO(606, RoomType.SUITE, false, true);
        when(repo.findByNumber(606)).thenReturn(Optional.of(existing));
        RoomDO persisted = createRoomDO(606, RoomType.SUITE, true, true);
        when(repo.save(any(RoomDO.class))).thenReturn(persisted);
        RoomPatchDTO patch = new RoomPatchDTO(true);
        RoomDTO response = service.patch(606, patch);
        verify(repo).save(existing);
        assertThat(existing.isHasMinibar()).isTrue();
        assertThat(existing.getType()).isEqualTo(RoomType.SUITE);
        assertThat(existing.isAvailable()).isTrue();
        assertThat(response.hasMinibar()).isTrue();
        assertThat(response.number()).isEqualTo(606);
    }
}
