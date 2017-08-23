selectRowsContaining = (select = 'prestige') => {
  console.info('clicking items containing ', select);
  resultTable = () => [...document.querySelectorAll('table')].reduce((acc, next) => next);
  firstChild = it => it.children[0];
  [...resultTable().tBodies[0].children]
    .filter(it => it.children[1].children[0].children[0].innerText.indexOf(select) > 1)
    .map(firstChild)
    .map(firstChild)
    .map(firstChild)
    .forEach(it => it.click());
};

["Business", "Business_Report", "Classifieds", "Entertainment", "Ezemidlalo",
 "Izindaba", "Life", "Life_Magazine", "Lifestyle", "Motoring", "News",
 "Opinion", "Property", "Racing", "Sport", "Television", "The_Times", "World",
  "_the_Bet"]
  .map(it => `${it}.png`)
 .concat('prestige')
 .sort()
 .forEach(selectRowsContaining)
