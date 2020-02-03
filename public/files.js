//Size assumed to be in KB

/////////////////////////////
//  Constants and Helpers  //
/////////////////////////////


// Random dates between range generated for 'preset' constant
// modified from: https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();

// Preset is unordered
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

// Basis for dom content to be inserted
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

////////////////////////////////
//        Main Thread         //
////////////////////////////////

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

async function exec() {
  console.log('Loading script...');
  //deep copy collection to avoid reference errors
  let current = files;
  let lastSort = 'name';
  let semiphore = 1;

  function init(){
    loadFileScript.invoked=1;
    insertHtml().then(() => {
      addListeners();
      renderListElements();
    });
  };

  // Terminate Script cleanly
  loadFileScript.exit = function exit(){
    loadFileScript.invoked=0;
    removeListeners().then(() => removeHtml())
  }

  // Attach and Remove listeners
  function addListeners() {
    return new Promise( resolve => {
      document.getElementById("new-directory-button").addEventListener("click", () => addNew('directory'));
      document.getElementById("upload-button").addEventListener("click", () => addNew('file'));
      document.getElementById("name-button").addEventListener("click", e => handleSortClick(e));
      document.getElementById("type-button").addEventListener("click", e => handleSortClick(e));
      document.getElementById("date-button").addEventListener("click", e => handleSortClick(e));
      document.getElementById("size-button").addEventListener("click", e => handleSortClick(e));
      return resolve();
    })
  }

  function removeListeners() {
    return new Promise( resolve => {
      document.getElementById("new-directory-button").removeEventListener("click", () => addNew('directory'), false);
      document.getElementById("upload-button").removeEventListener("click", () => addNew('file'), false);
      document.getElementById("name-button").removeEventListener("click", e => handleSortClick(e), false);
      document.getElementById("type-button").removeEventListener("click", e => handleSortClick(e), false);
      document.getElementById("date-button").removeEventListener("click", e => handleSortClick(e), false);
      document.getElementById("size-button").removeEventListener("click", e => handleSortClick(e), false);
      return resolve();
    })
  }

  // "Member" Functions
  function addNewDirectory() {
    return new Promise( resolve => { 
      current.push({
        name: "new_directory",
        type: "Directory",
        date: Date.now().toString(),
        size: 0
      })
      resolve();
    });
  }

  function addNew(type) {
    let n = {}
    if(type === 'file') n = { name: "new_file", date: Date.now().toString(), size: Math.floor(Math.random() * 100) + 1 }
    else n = { name: "new_directory", date: Date.now().toString(), size: Math.floor(Math.random() * 100) + 1 }
    current.push(n);
    let list = document.getElementById('content-list');
    let li = document.createElement('li');
    li.classList.add('list-item');
    for(attrib in n) {
      let div = document.createElement('div');
      div.classList.add(`${attrib}`);
      div.innerHTML = n[attrib];
      li.appendChild(div);
    }
    list.appendChild(li);
  }

  // Ad-hoc render function for ordered file list elements
  function renderListElements() {
    let list = document.getElementById('content-list');
    for(elem in current) {
      let li = document.createElement('li');
      li.classList.add('list-item');
      for(attrib in current[elem]) {
        let div = document.createElement('div');
        div.classList.add(`${attrib}`);
        div.innerHTML = current[elem][attrib];
        li.appendChild(div);
      }
      list.appendChild(li);
    }
  }
  function clearListElements() {
    return new Promise(resolve => {
      let ol = document.getElementById('content-list');
      
      while(ol.hasChildNodes()) {
        ol.removeChild(ol.firstChild);
      }
      resolve();
    });
  }

  // simple sorting function extending Array.prototype.sort()
  function sort(attrib) { // <attrib> target attribute for sorting
    return new Promise(resolve => {
      console.log(attrib)
      if(lastSort === attrib) {
        current.sort((a,b) => {
          if(a[attrib] > b[attrib]) return semiphore;
          else return -semiphore;
        });
        semiphore = -semiphore;
      } else {
        current.sort((a,b) => {
          if(a[attrib] > b[attrib]) return 1;
          else return -1;
        });
      }
      // keeps track of toggling for sorting
      lastSort = attrib;
      console.log(lastSort)
      resolve();
    })
  }

  // Handlers
  function handleSortClick(e) {
    sort(e.target.id.split('-')[0]).then(
      clearListElements().then(
        renderListElements()
      )
    )
  } 

  init();
}