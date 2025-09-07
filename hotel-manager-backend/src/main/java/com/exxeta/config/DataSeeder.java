package com.exxeta.config;

import com.exxeta.dataaccessobject.RoomRepository;
import com.exxeta.domainobject.RoomDO;
import com.exxeta.domainvalue.RoomType;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

// Seeds the database with initial Room data for development and test profiles
@Configuration
public class DataSeeder {

  @Bean
  @Profile({"dev","test"})
  CommandLineRunner seedRooms(RoomRepository repo) {
    return args -> {
      if (repo.count() > 0) return;
      RoomDO r1 = new RoomDO(); r1.setNumber(101); r1.setType(RoomType.DOUBLE); r1.setHasMinibar(true);  r1.setAvailable(true);
      RoomDO r2 = new RoomDO(); r2.setNumber(102); r2.setType(RoomType.SINGLE); r2.setHasMinibar(true);  r2.setAvailable(true);
      RoomDO r3 = new RoomDO(); r3.setNumber(201); r3.setType(RoomType.SUITE);  r3.setHasMinibar(false); r3.setAvailable(true);
      repo.save(r1); repo.save(r2); repo.save(r3);
    };
  }
}
