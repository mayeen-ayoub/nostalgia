const newScrapbook = document.getElementById("new-scrapbook");

newScrapbook.onclick = (event) => {
  event.preventDefault();
  const form = document.getElementById("new-scrapbook-form");
  form.classList.remove("hidden");
  const examples = document.getElementsByClassName("scrapbook-example");
  for (i = 0; i < examples.length; i++) {
    examples[i].classList.add("hidden");
  }
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
