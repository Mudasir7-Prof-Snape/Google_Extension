let link = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const linkFromLocalStorage = JSON.parse( localStorage.getItem("link") )
const tabBtn = document.getElementById("tab-btn")
if (linkFromLocalStorage) {
    link = linkFromLocalStorage
    render(link)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        link.push(tabs[0].url)
        localStorage.setItem("link", JSON.stringify(link) )
        render(link)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    link = []
    render(link)
})

inputBtn.addEventListener("click", function() {
    link.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("link", JSON.stringify(link) )
    render(link)
})