package com.exxeta.datatransferobject;

import com.exxeta.domainvalue.RoomType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;


public record RoomDTO(
    @NotNull @Min(1) Integer number,
    @NotNull RoomType type,
    @NotNull Boolean hasMinibar,
    @NotNull Boolean available
) {}
