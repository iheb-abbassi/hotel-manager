package com.exxeta.domainobject;

import com.exxeta.domainvalue.RoomType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "room")
@SQLDelete(sql = "UPDATE room SET deleted_at = now() WHERE id = ?")
@Where(clause = "deleted_at IS NULL")
public class RoomDO {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Integer number;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private RoomType type;

  @Column(nullable = false)
  private boolean hasMinibar;

  @Column(nullable = false)
  private boolean available;

  @Column(nullable = false, updatable = false)
  private Instant createdAt = Instant.now();

  @Column(nullable = false)
  private Instant updatedAt = Instant.now();

  @Column
  private Instant deletedAt;

  @PreUpdate
  void touch() { this.updatedAt = Instant.now(); }

}
