<script src="js/script.js"></script>
// Smooth scroll effect for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function joinNow() {
  document.getElementById('joinModal').style.display = 'none';
  document.querySelector('.content').style.display = 'block';
  document.getElementById('socialLinks').style.display = 'none'; // Hides social links
}