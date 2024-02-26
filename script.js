async function getavatar(username) {
    let response = await fetch("https://api.github.com/users/" + username);
    let data = await response.json();

    let userData = document.getElementById("userData");
    let profilePicture = document.createElement("div");
    let name = document.createElement("div");
    let basicdetails = document.createElement("div");


    profilePicture.id = "profilePicture";
    image = document.createElement("img");
    image.src = data.avatar_url;
    image.id = "avatar";
    image.style = "width: 5rem; height: 5rem; border-radius: 50%; margin: 1rem;"
    profilePicture.appendChild(image);


    name.id = "name";
    name.innerHTML = `<a href="${data.html_url}" target="_blank">${data.name}</a>`;



    basicdetails.id = "basicdetails";
    basicdetails.innerHTML = `<span class="basicdetailsdata">Followers: ${data.followers}</span>  &#160;&#160;&#160;&#160;<span class="basicdetailsdata">Following: ${data.following}</span><br><span class="basicdetailsdata">Public Repos: ${data.public_repos}</span>    &#160;&#160;&#160;&#160;<span class="basicdetailsdata">Public Gists: ${data.public_gists}</span>`;
    

    userData.appendChild(profilePicture);
    userData.appendChild(name);
    userData.appendChild(basicdetails);
}

async function getrepos(username) {
    let res = await fetch("https://api.github.com/users/" + username + "/repos");
    let data = await res.json();
    let list = document.createElement("ol");
    let listParent = document.getElementById("repos");
    list.id = "repoNames";
    listParent.appendChild(list);
    let elementsInRow;
    if (screen.width <= 1000) {
        elementsInRow = 1;
    }
    else {
        elementsInRow = 2;
    }
    for (let i = 0; i < data.length; i+=elementsInRow) {
        let table = document.getElementById("tableBox");
        let row = document.createElement("tr");
        for (let j = 0; j < elementsInRow; j++) {
            if (i+j >= data.length) {
                break;
            }
            if (i+j < data.length) {
                let url = data[i+j].html_url;
                let name = data[i+j].name;
                if (name.length > 30) {
                    name = name.slice(0, 30) + "...";
                }
                let forked = data[i+j].fork;
                if (forked) {
                    name = "(Forked) " + name;
                }
                let forkscount = data[i+j].forks_count;
                let starscount = data[i+j].stargazers_count;
                let watcherscount = data[i+j].watchers_count;
                let issuescount = data[i+j].open_issues_count;
                let license = data[i+j].license;
                let cell = document.createElement("td");
                cell.innerHTML = `<div class="boxintable">
                <span class = "individualRepoName"><a href="${url}" target="_blank">${name}</a></span><br><span class = "repoDetails">${forkscount} Forks&#160;&#160;&#160;&#160;&#160;&#160;${starscount} Stars&#160;&#160;&#160;&#160;&#160;&#160;${watcherscount} Watchers<br>${issuescount} Issues&#160;&#160;&#160;&#160;&#160;&#160;${license ? license.name : "No License" }</span>

                </div>`;
                row.appendChild(cell);
            }
        }
        table.appendChild(row);
    }
}

document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let table = document.getElementById("tableBox");
    table.innerHTML = "";
    let profile = document.getElementById("repos");
    profile.innerHTML = "";
    let userData = document.getElementById("userData");
    userData.style.backgroundColor = "#2a2b2f";
    userData.style.border = "0.3rem solid #2a2b2f"
    userData.innerHTML = "";
    var username = document.getElementById("username").value;
    getavatar(username);
    getrepos(username);
});