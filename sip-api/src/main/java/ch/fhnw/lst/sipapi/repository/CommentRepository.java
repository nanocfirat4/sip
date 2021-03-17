package ch.fhnw.lst.sipapi.repository;

import ch.fhnw.lst.sipapi.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Long> {
}
