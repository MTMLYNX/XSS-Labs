// Yorum objesi
function Comment(content) {
    this.content = content;
    this.timestamp = new Date().toLocaleString();
  }
  
  // Yorumları saklamak ve yönetmek için sınıf
  class CommentManager {
    constructor() {
      this.comments = JSON.parse(localStorage.getItem('comments')) || [];
    }
  
    // Yorumları local storage'a kaydet
    saveComment(comment) {
      this.comments.push(comment);
      localStorage.setItem('comments', JSON.stringify(this.comments));
    }
  
    // Yorumları local storage'dan al ve döndür
    getComments() {
      return this.comments;
    }
  }
  
  // Yorumları gösterme işlevi
  function displayComments() {
    const commentManager = new CommentManager();
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';
  
    commentManager.getComments().forEach(comment => {
      const commentHTML = `
        <div class="comment">
          <p>${comment.content}</p>
          <span>${comment.timestamp}</span>
        </div>
      `;
      commentsContainer.innerHTML += commentHTML;
    });
  }
  
  // Sayfa yüklendiğinde yorumları göster
  window.onload = function() {
    displayComments();
  
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const commentContent = document.getElementById('comment-content').value.trim();
  
      if (commentContent !== '') {
        const newComment = new Comment(commentContent);
        const commentManager = new CommentManager();
        commentManager.saveComment(newComment);
        displayComments();
        document.getElementById('comment-content').value = '';
      }
    });
  };