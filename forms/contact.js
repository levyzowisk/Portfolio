document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formResult = document.getElementById('form-result');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); 

      const formData = new FormData(contactForm);
      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      const json = JSON.stringify(object);

      formResult.innerHTML = "Enviando...";
      formResult.style.display = 'block';
      formResult.style.backgroundColor = '#f0ad4e'; 
      formResult.style.color = '#fff';
      formResult.style.padding = '15px';
      formResult.style.marginBottom = '20px';
      formResult.style.borderRadius = '5px';

      fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        })
        .then(async (response) => {
          let jsonResponse = await response.json();
          if (response.status == 200) {
            formResult.innerHTML = jsonResponse.message || "Mensagem enviada com sucesso!";
            formResult.style.backgroundColor = '#059652';
          } else {
            formResult.innerHTML = jsonResponse.message || "Ocorreu um erro. Tente novamente.";
            formResult.style.backgroundColor = '#df1529'; 
          }
        })
        .catch(error => {
          console.log(error);
          formResult.innerHTML = "Ocorreu um erro ao enviar o formulário.";
          formResult.style.backgroundColor = '#df1529';
        })
        .finally(() => {
          contactForm.reset(); 
          setTimeout(() => {
            formResult.style.display = 'none'; 
          }, 5000);
        });
    });
  }
});