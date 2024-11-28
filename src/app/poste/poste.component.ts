import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PosteComponent implements OnInit {
  userId = 'user123';  

  newPost = {
    title: '',
    content: ''
  };

  confirmationMessage: string | null = null;
  errorMessage: string | null = null;

  posts: any[] = [];

  constructor(private postService: PostService, private router: Router) {}  // Injeção do Router

  ngOnInit() {
    
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Erro ao carregar posts', error);
      }
    );
  }

  submitPost() {
    if (this.newPost.title.trim() === '' || this.newPost.content.trim() === '') {
      this.errorMessage = 'Por favor, preencha tanto o título quanto o conteúdo da história.';
      return;
    }

    this.postService.createPost(this.newPost).subscribe(
      (data) => {
        this.confirmationMessage = 'História compartilhada com sucesso!';
        this.posts.push(data);
        this.newPost = { title: '', content: '' };
      },
      (error) => {
        console.error('Erro ao criar post', error);
      }
    );
  }

  likePost(post: any) {
    this.postService.likePost(post.id, this.userId).subscribe(
      (data: any) => {
        post.likes = data.likes;
        post.likedBy = data.likedBy;
        if (post.likedBy.includes(this.userId)) {
          console.log('Você curtiu este post!');
        } else {
          console.log('Você descurtiu este post!');
        }
      },
      (error: any) => {
        alert(error.error.message);
      }
    );
  }

  commentPost(post: any) {
    if (post.commentText) {
      this.postService.commentPost(post.id, post.commentText).subscribe(
        (data) => {
          post.comments = data.comments;
          post.commentText = '';
        },
        (error) => {
          alert('Erro ao comentar');
        }
      );
    } else {
      alert('Por favor, escreva um comentário!');
    }
  }


  goBackToMenu() {
    this.router.navigate(['/home']);
  }
}