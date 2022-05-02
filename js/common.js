let sidemenuItems = [{"item":"HOME","link":"home.html"},{"item":"ANNUAL ASSESSMENTS","link":"annualassessments.html"},{"item":"ADMINISTRATIVE UNIT REPORTS","link":"#","subItems":[{"item":"FY 19-20","link":"administrativeunitreports-FY 19-20.html"},{"item":"FY 20-21","link":"administrativeunitreports-FY 20-21.html"},{"item":"FY 21-22","link":"administrativeunitreports-FY 21-22.html"}]},{"item":"RESEARCH CENTER REPORTS","link":"#","subItems":[{"item":"FY 19-20","link":"researchcenterreports-FY 19-20.html"},{"item":"FY 20-21","link":"researchcenterreports-FY 20-21.html"},{"item":"FY 21-22","link":"researchcenterreports-FY 21-22.html"}]},{"item":"STEPS TO COMPLETION","link":"steps-to-completion.html"},{"item":"BENEFITS","link":"benifits.html"},{"item":"PRINT REPORTS","link":"print.html"},{"item":"QUESTIONS?","link":"questions.html"}]
//SideMenu Start
//What evet written  before '//SideMenu Start' will be relace with sidemenuItems in automation scripts
let addsidemenu = function(page, subpage){
    let sidemenu = document.getElementById('navigation-bar');

    for(let i = 0; i < sidemenuItems.length; i++){
        let item = sidemenuItems[i];

        if(page != item.item){
            let link = '';
            if(item.hasOwnProperty('subItems') && item.link == '#'){
                link = item.subItems[0].link;
            } 
            else{
                link = item.link;
            }

            let menuItem = document.createElement("li");
            let menuItemContent = '<a href="' + link + '">'+ item.item +'</a>'; 
            menuItem.innerHTML = menuItemContent;
            menuItem.classList.add('navigation-items');
            menuItem.classList.add('hover-highlight');
            sidemenu.appendChild(menuItem);
        }
        else{
            if(subpage == ""){
                let link = '';
                if(item.hasOwnProperty('subItems') && item.link == '#'){
                    link = item.subItems[0].link;
                } 
                else{
                    link = item.link;
                }

                let menuItem = document.createElement("li");
                let menuItemContent = '<a href="' + link + '">'+ item.item +'</a>'; 
                menuItem.innerHTML = menuItemContent;
                menuItem.classList.add('navigation-items');
                menuItem.classList.add('hover-highlight');
                menuItem.setAttribute("id", "active-page");
                sidemenu.appendChild(menuItem);
            }
            else{
                let subitems = item.subItems;
                let submenu = '<ul id="sub-navigation-bar">';
                for(var j = 0; j< subitems.length; j++)
                {
                    if(j == 0)
                    {
                        submenu +='<li class="first-sub-navigation-item hover-highlight"';
                        if(subpage == subitems[j].item)
                        {
                            submenu += ' id = "active-page"';
                        }
                        submenu += '><a href="'+ subitems[j].link +'">'+ subitems[j].item +'</a></li>';
                    }
                    else if(j == subitems.length-1)
                    {
                        submenu +='<li class="last-sub-navigation-item hover-highlight"';
                        if(subpage == subitems[j].item)
                        {
                            submenu += ' id = "active-page"';
                        }
                        submenu += '><a href="'+ subitems[j].link +'">'+ subitems[j].item +'</a></li>';
                    }
                    else
                    {
                        submenu +='<li class="sub-navigation-items hover-highlight"';
                        if(subpage == subitems[j].item)
                        {
                            submenu += ' id = "active-page"';
                        }
                        submenu += '><a href="'+ subitems[j].link +'">'+ subitems[j].item +'</a></li>';
                    }
                }
                let menuItem = document.createElement("li");
                let menuItemContent = '<a href="' + subitems[0].link + '">'+ item.item +'</a>' + submenu; 
                menuItem.innerHTML = menuItemContent;
                menuItem.setAttribute("id", "expanded-navigation-item");
                sidemenu.appendChild(menuItem);
                }  
        }
    }
}

let generateAccordionElem = function(level, collapseId, headerId, parentId, childId, header, accordionContent){
    var headerno = level + 2;
    let accordionElem =  '<div class = "card"><div class="card-header level'+ level +'" id="'+ headerId + '">' +
                          '<button class="btn btn-link" data-toggle="collapse" data-target="#'+ collapseId + '" aria-expanded="false" aria-controls="' + collapseId + '">'+
                            '<h'+ headerno +' class = "content-header-no-margin">' + header + '<i class="fas fa-chevron-down"></i></h'+ headerno +'></button></div>'
                        + '<div id="'+ collapseId + '" class = "collapse" aria-labelledby= "'+ headerId + '" data-parent="#'+ parentId +'"> <div class = "card-body" id="'+ childId +'">'
                        + accordionContent +'</div></div></div>';  
    return accordionElem;
}

let createTabNavigation = function(distincttabs, tabname)
{
    let navigationContent = '<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">';
    for(let i = 0; i< distincttabs.length; i++)
    {
        let buttonContent = '';
        let tabId = tabname + i.toString();
        if(i == 0)
        {
            buttonContent = '<a class="nav-link active" id="pills-'+ tabId +'-tab" data-toggle="pill" href="#pills-'+ tabId +'" role="tab" aria-controls="pills-'+ tabId +'" aria-selected="true">'+ distincttabs[i] +'</a>';
        }
        else
        {
            buttonContent = '<a class="nav-link" id="pills-'+ tabId +'-tab" data-toggle="pill" href="#pills-'+ tabId +'" role="tab" aria-controls="pills-'+ tabId +'" aria-selected="true">'+ distincttabs[i] +'</a>';
        }
       
        let linkElement = '<li class="nav-item">' + buttonContent + '</li>';
        navigationContent = navigationContent + linkElement;
    }
    navigationContent += '</ul>';
    return navigationContent;
}

let buildTabContent = function(distincttabs, tabname, tabContent){
    let content = '<div class="tab-content" id="pills-tabContent">';
    
    for(let i = 0; i< distincttabs.length; i++)
    {
        let tabId = tabname + i.toString();
        if(i == 0)
        {
            content +='<div class="tab-pane fade show active" id="pills-'+ tabId +'" role="tabpanel" aria-labelledby="pills-'+ tabId +'-tab">';
        }
        else
        {
            content +='<div class="tab-pane fade" id="pills-'+ tabId +'" role="tabpanel" aria-labelledby="pills-'+ tabId +'-tab">';
        }
        content += tabContent[i];
        content += '</div>';
    }
    content += '</div>';
    return content;
}

function getDate(serial){
    let utc_days  = Math.floor(serial - 25569);
    let utc_value = utc_days * 86400;                                        
    let date_info = new Date(utc_value * 1000);
    return (parseInt(date_info.getMonth(),10) + 1) + '/' + (parseInt(date_info.getDate(),10) + 1) + '/' + date_info.getFullYear();//, 0, minutes, seconds);
}

function printAssessmentReport(type){
    var unit = document.getElementById("selectunit").value;
    let reportdata = JSON.parse(localStorage.getItem("data"));
    let unitdata = reportdata.data.filter(d => {
        return d.Unit == unit;
    })[0];
    let content = '';
    if(type == 'admin')
    {
        if(reportdata.FY == 'FY 19-20')
        {
            content = printAdminAssessment(unitdata["FY 19-20"],'2019','2020');
        }
        else if(reportdata.FY == 'FY 20-21')
        {
            content = printAdminAssessment(unitdata["FY 20-21"],'2020','2021');
        }
        else if(reportdata.FY == 'FY 21-22')
        {
            content = printAdminAssessment(unitdata["FY 21-22"],'2021','2022');
        }
        else {
            content = "Print Not implemented for the year:" + reportdata.FY;
        }
       
    }
    else
    {
        if(reportdata.FY == 'FY 19-20')
        {
            content = printResearchAssessment(unitdata["FY 19-20"],'2019','2020');
        }
        else if(reportdata.FY == 'FY 20-21')
        {
            content = printResearchAssessment(unitdata["FY 20-21"],'2020','2021')
        }
        else if(reportdata.FY == 'FY 21-22')
        {
            content = printResearchAssessment(unitdata["FY 21-22"],'2021','2022')
        }
        else {
            content = "Print Not implemented for the year:" + reportdata.FY;
        }
    }
    
    var win = window.open("print.html", "_blank");
    win.document.write(content); // where 'html' is a variable containing your HTML
    win.document.close(); 
}

function printPlanningReport(type){
    var unit = document.getElementById("selectunit").value;
    let reportdata = JSON.parse(localStorage.getItem("data"));
    let unitdata = reportdata.data.filter(d => {
        return d.Unit == unit;
    })[0];
    let content = '';
    if(type == 'admin')
    {
        if(reportdata.FY == 'FY 19-20')
        {
            content = printAdminPlanning(unitdata["FY 20-21"], '2020','2021');
        }
        else if(reportdata.FY == 'FY 20-21')
        {
            content = printAdminPlanning(unitdata["FY 21-22"], '2021','2022');
        }  
        else if(reportdata.FY == 'FY 21-22')
        {
            content = printAdminPlanning(unitdata["FY 22-23"], '2022','2023');
        } 
        else {
            content = "Print Not implemented for the year:" + reportdata.FY;
        }         
    }
    else
    {
        if(reportdata.FY == 'FY 19-20')
        {
            content = printResearchPlanning(unitdata["FY 20-21"],'2020','2021');
        }
        else if(reportdata.FY == 'FY 20-21')
        {
            content = printResearchPlanning(unitdata["FY 21-22"],'2021','2022');
        }
        else if(reportdata.FY == 'FY 21-22')
        {
            content = printResearchPlanning(unitdata["FY 22-23"],'2022','2023');
        }
        else {
            content = "Print Not implemented for the year:" + reportdata.FY;
        }
    }
    
    var win = window.open("print.html", "_blank");
    win.document.write(content); // where 'html' is a variable containing your HTML
    win.document.close(); 
}

function changeReportUnit(){
    var unit = document.getElementById("selectunit").value;
    let reportdata = JSON.parse(localStorage.getItem("data"));
    let unitdata = reportdata.data.filter(d => {
        return d.Unit == unit;
    })[0];
    buildReport(unitdata, reportdata.FY);
}

let getDistinctAttributes = function (objects, attribute) {
    if(objects == null)
        return [];
    let mappedAttributes = objects.map(function (object) {
        return object[attribute];
    });
    let distinctAttributes = mappedAttributes.filter(function (v, i, a) {
        return a.indexOf(v) === i;
    });

    return distinctAttributes;
}