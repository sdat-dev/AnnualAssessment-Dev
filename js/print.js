window.onload = function () {
    /* Research Cneter dATA*/
    let dataurl = "data/allreportsdata.json";
    /* Research Cneter request*/
    const datarequest = axios.get(dataurl);
    /* calls*/
    axios.all([datarequest]).then(axios.spread((...responses) => {
    let responsedata = responses[0].data;
    localStorage.clear();
    localStorage.setItem("data",JSON.stringify(responsedata));

    let adminunitsfulldata = responsedata.AdminUnits;
 
    let printform = '<form id="form">' +
                        '<fieldset>'+
                            '<legend>Select Period To Print</legend>'+
                            '<select id="period" onchange="changePeriod()">';
    FYs = Object.keys(adminunitsfulldata);
    FYs.sort();
    for (var FY of FYs){
        printform += '<option value="'+ FY + '"> '+ FY +' </option>';
    }
    printform += '</select>'+
            '</fieldset>'+
            '<fieldset id="units">'+
            '<legend>Select Administrative Units To Print</legend>';
    
    let currentFY = FYs[0];
    let adminFYData = adminunitsfulldata[currentFY];
    let units = getDistinctAttributes(adminFYData.data, "Unit");
    let validunits = [];
    for(i =0; i< units.length;i++){
        if(units[i] != "")
            validunits.push(units[i]);
    }

    var count  = 1 ;
    for(i = 0; i < validunits.length; i++){
        let id = 'report' + count;
        printform += '<div>' +
        '<input type="checkbox" id="'+ id +'" class="unit" value="' + validunits[i] + '">'+
        '<label>' + validunits[i] + '</label>'+
        '</div>';
        count++;
    }
    
    printform +='</fieldset>'+
                '<fieldset id="units_research">'+
                '<legend>Select Research Centers To Print</legend>';
    
    let researchcentersfulldata = responsedata.ResearchCenters;
    let researchCenterFYData = researchcentersfulldata[currentFY];
    let centers = getDistinctAttributes(researchCenterFYData.data, "Unit");
    let validcenters = [];
    for(i =0; i< centers.length;i++){
        if(centers[i] != "")
        validcenters.push(centers[i]);
    }
    for(i = 0; i < validcenters.length; i++){
        let id = 'report' + count;
        printform += '<div>' +
        '<input type="checkbox" id="'+ id +'" class="unit" value="' + validcenters[i] + '">'+
        '<label>' + validcenters[i] + '</label>'+
        '</div>';
        count++;
    }

    printform += '</fieldset>'+ 
        '<fieldset id="type">'+
            '<legend>Select Type of Report to print</legend>'+
            '<div>'+
                '<input type="checkbox" id="type1" class="type" value="assessment">'+
                '<label id="assessment-label">Assessment (2019-2020)</label>'+
            '</div>'+
            '<div>'+
                '<input type="checkbox" id="type2" class="type" value="planning">'+
                '<label id="planning-label">Planning (2020-2021)</label>'+
            '</div>'+
        '</fieldset>'+
        '<div>'+
            '<button class="print-button" type="submit">Print Report</button>'+
        '</div>'+
    '</form>';   
    let content = document.getElementsByClassName('content')[0];    
    content.innerHTML = printform;  
    const form = document.getElementById('form');
    form.addEventListener('submit', printReport);          
    })).catch(errors => {
    console.log(errors);
    })
}

function changePeriod(){
    var period = document.getElementById("period").value;
    var data = JSON.parse(localStorage.getItem("data"));
    let adminFYData = data.AdminUnits[period];

    let unitoptions = '<legend>Select Administrative Units To Print</legend>';
    let units = [];
    if(adminFYData != undefined)
        units = getDistinctAttributes(adminFYData.data, "Unit");
    let validunits = [];
    for(i =0; i< units.length;i++){
        if(units[i] != "")
            validunits.push(units[i]);
    }

    var count = 1;
    for(i = 0; i < validunits.length; i++){
        let id = 'report' + count;
        unitoptions += '<div>' +
        '<input type="checkbox" id="'+ id +'" class="unit" value="' + validunits[i] + '">'+
        '<label>' + validunits[i] + '</label>'+
        '</div>';
        count++;
    }

    let unitselement = document.getElementById("units");
    unitselement.innerHTML = unitoptions;

    let centeroptions ='<legend>Select Research Centers To Print</legend>';

    let researchCenterFYData = data.ResearchCenters[period];
    let centers = [];
    if(researchCenterFYData != undefined)
        centers = getDistinctAttributes(researchCenterFYData.data, "Unit");
    let validcenters = [];
    for(i =0; i< centers.length;i++){
        if(centers[i] != "")
        validcenters.push(centers[i]);
    }

    for(i = 0; i < validcenters.length; i++){
        let id = 'report' + count;
        centeroptions += '<div>' +
        '<input type="checkbox" id="'+ id +'" class="unit" value="' + validcenters[i] + '">'+
        '<label>' + validcenters[i] + '</label>'+
        '</div>';
        count++;
    }
    
    let centerselement = document.getElementById("units_research");
    centerselement.innerHTML = centeroptions;

    var assementlable = document.getElementById("assessment-label");
    var planninglable = document.getElementById("planning-label")

    switch (period){
        case 'FY 19-20':
            assementlable.innerText = "Assessment (2019-2020)";
            planninglable.innerText = "Planning (2020-2021)";
            break;
        case 'FY 20-21':
            assementlable.innerText = "Assessment (2020-2021)";
            planninglable.innerText = "Planning (2021-2022)";
            break;
        case 'FY 21-22':
            assementlable.innerText = "Assessment (2021-2022)";
            planninglable.innerText = "Planning (2022-2023)";
          break;
        default:
          console.log(`Sorry, we are out of ${period}.`);
    }
}

function printReport(event) {
    event.preventDefault();
    var units = document.getElementById('units');
    var units_research = document.getElementById('units_research');
    var el = document.getElementById('type');
    var units_selected = [];
    for (let i = 1; i < units.children.length; i++) {
        let current = units.children[i].firstElementChild;
        if (current.checked == true) {
            units_selected.push(current.value);
        }
    }

    var units_research_selected = [];
    for (let j = 1; j < units_research.children.length; j++) {
        let current_units = units_research.children[j].firstElementChild;
        if (current_units.checked == true) {
            units_research_selected.push(current_units.value);
        }
    }

    var units_e1 = [];
    for (let k = 1; k < el.children.length; k++) {
        let current_units_e1 = el.children[k].firstElementChild;
        if (current_units_e1.checked == true) {
            units_e1.push(current_units_e1.value);
        }
    }

    var contenttotal = '';
    var period = document.getElementById("period").value;
    var content = '';

    var data = JSON.parse(localStorage.getItem("data"));
    for (var k = 0; k < units_e1.length; k++) {
        // Add admin units assessment
        for(var i = 0; i< units_selected.length; i++)
        {
            var unitdata = data.AdminUnits[period].data.filter(d => {
                return d.Unit == units_selected[i];
            })[0];
            if (units_e1[k] == 'assessment') {
                if(period == 'FY 19-20')
                {
                    content = printAdminAssessment(unitdata["FY 19-20"],'2019','2020');
                }
                else if(period == 'FY 20-21')
                {
                    content = printAdminAssessment(unitdata["FY 20-21"],'2020','2021')
                }
                else if(period == 'FY 21-22')
                {
                    content = printAdminAssessment(unitdata["FY 21-22"],'2021','2022')
                }
                else {
                    content = "Print Not implemented for the year:" + period;
                }
                if (content !== '') {
                    contenttotal += content;
                }
            }
        }
        // Add research centers assessment
        for(var j = 0; j< units_research_selected.length; j++)
        {
            var centerdata =data.ResearchCenters[period].data.filter(d => {
                return d.Unit == units_research_selected[j];
            })[0];
            if (units_e1[k] == 'assessment') {
                if(period == 'FY 19-20')
                {
                    content = printResearchAssessment(centerdata["FY 19-20"],'2019','2020');
                }
                else if(period == 'FY 20-21')
                {
                    content = printResearchAssessment(centerdata["FY 20-21"],'2020','2021')
                }
                else if(period == 'FY 21-22')
                {
                    content = printResearchAssessment(centerdata["FY 21-22"],'2021','2022')
                }
                else {
                    content = "Print Not implemented for the year:" + period;
                }

                if (content !== '') {
                    contenttotal += content;
                }
            }
        }
        // Add admin units planning
        for(var i = 0; i< units_selected.length; i++)
        {
            var unitdata = data.AdminUnits[period].data.filter(d => {
                return d.Unit == units_selected[i];
            })[0];
            if (units_e1[k] == 'planning') {
                if(period == 'FY 19-20')
                {
                    content = printAdminPlanning(unitdata["FY 20-21"], '2020','2021');
                }
                else if(period == 'FY 20-21')
                {
                    content = printAdminPlanning(unitdata["FY 21-22"], '2021','2022');
                }
                else if(period == 'FY 21-22')
                {
                    content = printAdminPlanning(unitdata["FY 22-23"], '2022','2023');
                }
                else {
                    content = "Print Not implemented for the year:" + period;
                }

                if (content !== '') {
                    contenttotal += content;
                }     
            }
        }
        // Add research centers planning
        for(var j = 0; j< units_research_selected.length; j++)
        {
            var centerdata =data.ResearchCenters[period].data.filter(d => {
                return d.Unit == units_research_selected[j];
            })[0];
            if (units_e1[k] == 'planning') {
                if(period == 'FY 19-20')
                {
                    content = printResearchPlanning(centerdata["FY 20-21"],'2020','2021');
                }
                else if(period == 'FY 20-21')
                {
                    content = printResearchPlanning(centerdata["FY 21-22"],'2021','2022');
                }
                else if(period == 'FY 21-22')
                {
                    content = printResearchPlanning(centerdata["FY 22-23"],'2022','2023');
                }
                else {
                    content = "Print Not implemented for the year:" + period;
                }
                if (content !== '') {
                    contenttotal += content;
                }
            }
        }
    }
    if(contenttotal == '')
        contenttotal = "Please select admin units/research units and type of the report to print";

    var win = window.open("print.html", "reportprinttemplate.html");
    win.document.write(contenttotal); // where 'html' is a variable containing your HTML
    win.document.close();
}

function getYears(FY){
    if(FY == 'FY 19-20'){
        return '2019-2020';
    } else if(FY == 'FY 20-21'){
        return '2020-2021';
    } else {
        return '2021-2022';
    }
}
