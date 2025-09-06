package com.exxeta;

import com.exxeta.datatransferobject.RoomDTO;
import com.exxeta.domainvalue.RoomType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class RoomControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Can create and retrieve a room via HTTP API")
    void createAndGetRoom() throws Exception {
        // language=JSON
        String roomJson = """
        {
          \"number\": 1234,
          \"type\": \"DOUBLE\",
          \"hasMinibar\": true,
          \"available\": true
        }
        """;

        // Create room
        mockMvc.perform(post("/api/rooms")
                .contentType(MediaType.APPLICATION_JSON)
                .content(roomJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.number").value(1234))
                .andExpect(jsonPath("$.type").value("DOUBLE"));

        // Retrieve room
        mockMvc.perform(get("/api/rooms/1234"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.number").value(1234))
                .andExpect(jsonPath("$.type").value("DOUBLE"))
                .andExpect(jsonPath("$.hasMinibar").value(true))
                .andExpect(jsonPath("$.available").value(true));
    }
}

