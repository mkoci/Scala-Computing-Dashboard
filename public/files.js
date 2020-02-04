// Basis for dom content to be inserted

// Random dates between range generated for 'preset' constant
// modified from: https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
const randomDate = () => {
  let start = new Date(2015, 0, 1)
  let end = new Date()
  return  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}
// Preset is unordered
const folders = [
  {
    name: "zips",
    type: "Directory",
    dateModified: randomDate(),
    size: 300
  },
  {
    name: "presets",
    type: "Directory",
    dateModified: randomDate(),
    size: 4
  },
  {
    name: "workflow",
    type: "Directory",
    dateModified: randomDate(),
    size: 37
  },
  {
    name: "software",
    type: "Directory",
    dateModified: randomDate(),
    size: 78
  }
];


const htmlString = `
<div id="file-container">
  <h1 class="file-header">Files</h1>
  <div class="top-action">
    <h2 id="root-header">Root /</h2>
    <div class="action-row">
      <div class="left-action">
        <button id="new-directory-button">New Directory</button>
        <button id="upload-button">Upload File</button>
      </div>
      <div class="right-action">
        <input type="text" id="search-bar" oninput="loadFileScript.onSearchChange()" placeholder="Search..."/>
      </div>  
    </div>
  </div>
  <div class="file-section">
    <table class="content-table">
      <thead>
        <tr>
          <th class="table-header" scope="col"><span id="name-span">Name</span></th>
          <th class="table-header" scope="col"><span id="type-span">Type</span></th>
          <th class="table-header" scope="col"><span id="date-span">Date Modified</span></th>
          <th class="table-header" scope="col"><span id="size-span">Size</span></th>
        </tr>
      </thead>
      <tbody id="content-table-body"></tbody>
    </table>
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
  let current = folders;
  let root = current;
  let files = presetFiles;
  let lastSort = 'name';
  let semiphore = 1;
  let currentFileName = false;

  function init(){
    loadFileScript.invoked=1;
    insertHtml().then(() => {
      addListeners();
      renderTableElements();
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
      document.getElementById("new-directory-button").addEventListener("click", () => addNew('Directory'));
      document.getElementById("upload-button").addEventListener("click", () => addNew('File'));
      document.getElementById("search-bar").addEventListener("keyup", e => onSearchChange(e), false);
      document.getElementById("name-span").addEventListener("click", e => handleSortClick(e));
      document.getElementById("type-span").addEventListener("click", e => handleSortClick(e));
      document.getElementById("date-span").addEventListener("click", e => handleSortClick(e));
      document.getElementById("size-span").addEventListener("click", e => handleSortClick(e));
      document.getElementById("root-header").addEventListener("click", () => handleRootClick())
      return resolve();
    })
  }

  function removeListeners() {
    return new Promise( resolve => {
      document.getElementById("new-directory-button").removeEventListener("click", () => addNew(), false);
      document.getElementById("upload-button").removeEventListener("click", () => addNew(), false);
      document.getElementById("search-bar").removeEventListener("keyup", () => onSearchChange(), false);
      document.getElementById("name-span").removeEventListener("click", e => handleSortClick(e), false);
      document.getElementById("type-span").removeEventListener("click", e => handleSortClick(e), false);
      document.getElementById("date-span").removeEventListener("click", e => handleSortClick(e), false);
      document.getElementById("size-span").removeEventListener("click", e => handleSortClick(e), false);
      return resolve();
    })
  }

  // Member Functions
  function addNew(type) {
    let n = {
      name: type === 'File' ? 'new_file' : 'new_directory',
      type: type,
      date: Date.now().toString(), 
      size: Math.floor(Math.random() * 100) + 1
    };
    let tbody = document.getElementById('content-table-body');
    let tr = document.createElement('tr');
    tr.classList.add('table-row');
    let input = document.createElement('input');
    input.value = type === 'File' ? 'new_file' : 'new_directory';
    tr.appendChild(input);
    input.addEventListener('blur', e => {
      n.name = e.target.value
      if(!!currentFileName ) n.parent = currentFileName;
      if(type === 'File') {
        files.push(n);
        current.push(n);
      } else {
        current.push(n);
      };
      rerenderTable();
    })
    for(attrib in n) {
      let td = document.createElement('td');
      td.classList.add(`${attrib}`);
      td.innerHTML = n[attrib];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
    input.focus()
  }

  // Ad-hoc render function for ordered file list elements
  function renderTableElements() {
    let tbody = document.getElementById('content-table-body');
    
    for(elem in current) {
      let tr = document.createElement('tr');
      tr.classList.add('table-row');
      for(attrib in current[elem]) {
        if(attrib !== 'parent') {
          let td = document.createElement('td');
          td.classList.add("table-data");
          td.classList.add(`${attrib}`);
          td.innerHTML = current[elem][attrib];
          td.addEventListener('click', e => handleDirectoryClick(e))
          tr.appendChild(td);
        }
      }
      tbody.appendChild(tr);
    }
  }

  function clearTableElements() {
    return new Promise(resolve => {
      let tbody = document.getElementById('content-table-body');
      while(tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
      }
      resolve();
    });
  }

  function rerenderTable() {clearTableElements().then(() => renderTableElements())};

  // simple sorting function extending Array.prototype.sort()
  function sort(attrib) { // <attrib> target attribute for sorting
    return new Promise(resolve => {
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
      rerenderTable()
    )
  }

  function handleDirectoryClick(e) {
    currentFileName = e.target.innerHTML
    current = files.filter(file => file.parent === e.target.innerHTML);
    document.getElementById("new-directory-button").style.display = 'none';
    document.getElementById("root-header").innerHTML = `Root / ${e.target.innerHTML}`;
    rerenderTable();
  }

  function handleRootClick() {
    currentFileName = false;
    current = root;
    document.getElementById("new-directory-button").style.display = 'inline-block ';
    document.getElementById("root-header").innerHTML = 'Root /';
    clearTableElements().then(() => {
      renderTableElements();
    })
  }

  function onSearchChange(e) {
   let fuse = new Fuse(files, { keys: ['name']})
   let result = fuse.search(e.target.value)
   console.log(result);
   current = result;
   rerenderTable();
  }

  init();
}


/////////////////////////////
//  Constants and Helpers  //
/////////////////////////////







const presetFiles = [
  {
    name: "mountsys.zip",
    type: "File",
    dateModified: randomDate(),
    size: 1,
    parent: "zips"
  },
  {
    name: "totally_not_cat_pics.zip",
    type: "File",
    dateModified: randomDate(),
    size: 7809,
    parent: "zips"
  },
  {
    name: "config.py",
    type: "File",
    dateModified: randomDate(),
    size: 300,
    parent: "presets"
  },
  {
    name: "config.cpp",
    type: "File",
    dateModified: randomDate(),
    size: 12,
    parent: "presets"
  },
  {
    name: "hacktheplanet.sh",
    type: "File",
    dateModified: randomDate(),
    size: 1,
    parent: "workflow"
  },
  {
    name: "thefunk.sh",
    type: "File",
    dateModified: randomDate(),
    size: 1,
    parent: "workflow"
  },
  {
    name: "regconfig.exe",
    type: "File",
    dateModified: randomDate(),
    size: 1,
    parent: "presets"
  },
  {
    name: "readme",
    type: "File",
    dateModified: randomDate(),
    size: 1,
    parent: "software"
  },
  {
    name: "readme",
    type: "File",
    dateModified: randomDate(),
    size: 1,
    parent: "software"
  },
  {
    name: "readme",
    type: "File",
    dateModified: randomDate(),
    size: 1,
    parent: "software"
  },
  {
    name: "readme",
    type: "File",
    dateModified: randomDate(),
    size: 1,
    parent: "software"
  },
];