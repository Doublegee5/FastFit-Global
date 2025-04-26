// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Form submission alert
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset(); // Clear the form after submission
});

// Add fade-in effect when scrolling to sections
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1,
});

sections.forEach(section => {
    observer.observe(section);
});

<script>
  document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const height = parseFloat(document.getElementById('height').value) / 100; // convert cm to meters
    const weight = parseFloat(document.getElementById('weight').value);

    if (height > 0 && weight > 0) {
      const bmi = (weight / (height * height)).toFixed(2);
      let category = "";

      if (bmi < 18.5) {
        category = "Underweight";
      } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal weight";
      } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
      } else {
        category = "Obese";
      }

      document.getElementById('bmiResult').innerHTML = `Your BMI is <strong>${bmi}</strong> (${category})`;
    } else {
      document.getElementById('bmiResult').innerHTML = "Please enter valid height and weight.";
    }
  });
</script>
