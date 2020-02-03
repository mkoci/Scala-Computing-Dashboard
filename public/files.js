//Size assumed to be in KB
// Random dates between range generated for 'preset' constant
//https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

const files = [
  {
    name: "zips",
    type: "Directory",
    dateModified: randomDate(new Date(2015, 0, 1), new Date()),
    size: 12
  },
  {
    name: "presets",
    type: "Directory",
    dateModified: randomDate(new Date(2015, 0, 1), new Date()),
    size: 4
  },
  {
    name: "workflow",
    type: "Directory",
    dateModified: randomDate(new Date(2015, 0, 1), new Date()),
    size: 37
  },
  {
    name: "software",
    type: "Directory",
    dateModified: randomDate(new Date(2015, 0, 1), new Date()),
    size: 78
  },
  {
    name: "nmm_data",
    type: "Directory",
    dateModified: randomDate(new Date(2015, 0, 1), new Date()),
    size: 60
  },
  {
    name: "readme",
    type: "File",
    dateModified: randomDate(new Date(2015, 0, 1), new Date()),
    size: 1
  },
  {
    name: "schema",
    type: "File",
    dateModified: randomDate(new Date(2015, 0, 1), new Date()),
    size: 12
  },
  {
    name: "etc",
    type: "Directory",
    dateModified: randomDate(new Date(2015, 0, 1), new Date()),
    size: 89
  },
];

const htmlString = `
<div id="file-container">
  <h1 class="file-header">Files</h1>
  <div class="top-action">
    <h2>Root /</h2>
    <div class="left-action">
      <button id="new-directory-button">New Directory</button>
      <button id="upload-button">Upload</button>
    </div>
    <div class="right-action">
      <input type="text" id="search-bar" palceholder="Search..."/>
    </div>  
  </div>
  <div class="file-section">
    <div class="sort-buttons">
      <button id="name-button">Name</button>
      <button id="type-button">Type</button>
      <button id="date-button">Date Modified</button>
      <button id="size-button">Size</button>
    </div>
    <ol id="content-list" class="content-list">
    </ol>
  </div>
</div>
`

// Loading of the vanilla js as well as exec and remove from dom
var loadFileScript=window.loadFileScript=window.loadFileScript||[];
loadFileScript.exec = () => exec();

function removeHtml() {
  let container = document.getElementById('file-container');
  if(!!container) container.remove();
}

function insertHtml() {
  return new Promise(resolve => {
    let container = document.getElementById('file-root')
    container.innerHTML = htmlString;
    resolve();
  })
}

// Main Thread

async function exec() {
  console.log('Loading script...');
  //deep copy collection to avoid reference errors
  let current = JSON.parse(JSON.stringify(files));;
  let lastSort = 'name';

  function init(){
    insertHtml().then(() => {
      addListeners();
      renderListElements();
    });
  };

  //clean up listeners
  loadFileScript.exit = function exit(){
    removeListeners().then(() => removeHtml())
  }

  ///////////    Exec Closure functions
  function addListeners() {
    return new Promise( resolve => {
      document.getElementById("new-directory-button").addEventListener("click", newDirectory);
      document.getElementById("upload-button").addEventListener("click", newFile);
      document.getElementById("name-button").addEventListener("click", e => handleSortClick(e));
      document.getElementById("type-button").addEventListener("click", e => handleSortClick(e));
      document.getElementById("date-button").addEventListener("click", e => handleSortClick(e));
      document.getElementById("size-button").addEventListener("click", e => handleSortClick(e));
      return resolve();
    })
  }

  function removeListeners() {
    return new Promise( resolve => {
      document.getElementById("new-directory-button").removeEventListener("click", newDirectory, false);
      document.getElementById("upload-button").removeEventListener("click", newFile, false);
      document.getElementById("name-button").removeEventListener("click", e => sort(e), false);
      document.getElementById("type-button").removeEventListener("click", e => sort(e), false);
      document.getElementById("date-button").removeEventListener("click", e => sort(e), false);
      document.getElementById("size-button").removeEventListener("click", e => sort(e), false);
      return resolve();
    })
  }
  function newDirectory() {
    console.log('new directory add')
    current.push({
      name: "new_directory",
      type: "Directory",
      date: Date.now().toString(),
      size: 0
    })
    console.log(current)
  }
  function newFile() {
    console.log('new file add')
    current.push({
      name: "new_directory",
      type: "File",
      date: Date.now().toString(),
      size: 0
    })
    console.log(current)
  }

  function renderListElements() {

    let list = document.getElementById('content-list');
    for(elem in current) {
      let li = document.createElement('li');
      li.classList.add('list-item')
      for(attrib in current[elem]) {
        let div = document.createElement('div');
        div.classList.add(`${attrib}`)
        div.innerHTML = current[elem][attrib]
        li.appendChild(div);
      }
      list.appendChild(li);
    }
  }

  function sort(e) { // attrib = (string), ascending (bool)
    return new Promise(resolve => {
      let attrib = e.target.id.split('-')[0];
      current.sort((a,b) => {
        if(lastSort === attrib) {
          if(a[attrib] > b[attrib]) return 1;
          else return -1
        } else {
          if(a[attrib] > b[attrib]) return -1;
          else return 1
        }
      });
      lastSort = attrib;
      resolve();
    })
  }

  function handleSortClick(e) {
    let ol = document.getElementById('content-list');
    while(ol.firstChild) {
      ol.removeChild(ol.firstChild)
    }
    sort(e).then(() => renderListElements());
  }
  init();

}