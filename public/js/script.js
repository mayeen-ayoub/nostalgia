const newScrapbook = document.getElementById("new-scrapbook");

newScrapbook.onclick = () => {
  const form = document.getElementById("new-scrapbook-form");
  form.classList.remove("hidden");
  newScrapbook.classList.add("hidden");
}

var scrapbookInfo;

const createScrapbook = document.getElementById('create-scrapbook');
createScrapbook.onclick = (event) => {
  event.preventDefault();
  let scrapbookInfoInputs = document.getElementById('scrapbook-form').getElementsByTagName("input");
  
  scrapbookInfo = {
    name: scrapbookInfoInputs[0].value,
    startDate: scrapbookInfoInputs[1].value,
  }
  
}
