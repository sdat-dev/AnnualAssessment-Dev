let dataURL = "data/researchcenterreports-FY2020-2021.json";
//getting content Element to append grants information
window.onload = function () {
    let request = axios.get(dataURL);
    axios.all([request]).then(axios.spread((...responses) => {
        let responsedata = responses[0].data;
        localStorage.clear();
        localStorage.setItem("data", JSON.stringify(responsedata));
        
        let units = getDistinctAttributes(responsedata.data, "ExternalReference");
        let validunits = [];
        for(i =0; i< units.length;i++){
            if(units[i] != "")
                validunits.push(units[i]);
        }
        let headercontent = ' <select id="selectunit" onchange="changeReportUnit()">';
        for(i = 0; i < validunits.length; i++){
            headercontent = headercontent + '<option value="'+ validunits[i]+'">'+ validunits[i] +'</option>';
        }
        headercontent = headercontent + '</select> '+ responsedata.FY;
        let contentHeadr = document.getElementsByClassName('report-header')[0];
        contentHeadr.innerHTML = headercontent;

        let unitdata = responsedata.data.filter(d => {
            return d.ExternalReference == validunits[0];
        });
        buildReport(unitdata[0], responsedata.FY);
    })).catch(errors => {
        console.log(errors);
    })
}

let buildReport = function (data, period) {
    let maincontentContainer = document.getElementsByClassName('report')[0];
    let years = [];
    let tabheaders = [];
    let tabcontent = [];
    let content = '';
    if (period == 'FY2020-2021') {
        years = ['FY 2020-21', 'FY 2021-22'];
        tabheaders = ['Assessment FY21 <br><span style="font-size:15px;"> (Year Completed)</span>', 'Planning FY22 <br> <span style="font-size:15px;">(Year Ahead)<span>'];
        tabcontent.push(addAssessmentReport(data.FY2021, '2020', '2021'));
        tabcontent.push(addPlanningReport(data.FY2122, '2021', '2022'));
    }
    else if (period == 'FY2019-2020') {
        years = ['FY 2019-20', 'FY 2020-21'];
        tabheaders = ['Assessment FY20 <br><span style="font-size:15px;"> (Year Completed)</span>', 'Planning FY21 <br> <span style="font-size:15px;">(Year Ahead)<span>'];
        tabcontent.push(addAssessmentReport(data.FY1920, '2019', '2020'));
        tabcontent.push(addPlanningReport(data.FY2021, '2020', '2021'));
    }

    content += createTabNavigation(tabheaders, "year");
    content += buildTabContent(years, 'year', tabcontent);
    maincontentContainer.innerHTML = content.trim();;
}

let counter = 1;
let getIds = function (year) {
    let ids = {};
    ids["parentId"] = year;
    ids["collapseId"] = "collapse" + counter;
    ids["headerId"] = "heading" + counter;
    ids["childId"] = "#";
    counter++;
    return ids;
}


/*.......Research reports .....*/
let addAssessmentReport = function (reportdata, year1, year2) {

    let content = '';

    content += '<p><b>Director\'s Name: </b>' + reportdata.RecipientFirstName + ' ' + reportdata.RecipientLastName +
        '<br><b>Director\'s Email: </b>' + reportdata.RecipientEmail +
        '<br><b>Reporting Period: </b>July 1, ' + year1 + ' to June 30, ' + year2 +
        '<button type="button" style="float:right; background-color: #46166b; color:white ; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 2px; margin-right: 1px;text-align: center; margin: 0 auto;"onclick="printAssessmentReport(\'researchcenter\')">Print</button>';
    content += '<div id = "FY' + year1 + '">';

    let ids = getIds('FY' + year1);
    let data = {};
    data["mission"] = reportdata.Q31;
    data["vision"] = reportdata.Q32;
    content += addMissionAndVision(ids, data);

    ids = getIds('FY' + year1);
    data = {};
    data["annualBudget"] = reportdata.Q41;
    data["employeesState"] = checkNull(reportdata.Q42_1_1);
    data["employeesRF"] = checkNull(reportdata.Q42_1_2);
    data["fteState"] = checkNull(reportdata.Q42_2_1);
    data["fteRF"] = checkNull(reportdata.Q42_2_2);
    data["nameOfadditionalsource1"] = checkNull(reportdata.Q43_1);
    data["nameOfadditionalsource11"] = checkNull(reportdata.Q43_1_TEXT);

    data["nameOfadditionalsource2"] = checkNull(reportdata.Q43_2);
    data["nameOfadditionalsource21"] = checkNull(reportdata.Q43_2_TEXT);

    data["nameOfadditionalsource3"] = checkNull(reportdata.Q43_3);
    data["nameOfadditionalsource31"] = checkNull(reportdata.Q43_3_TEXT);

    data["total3"] = checkNull(reportdata.Q43_4_1);
    data["total33"] = checkNull(reportdata.Q43_4_2);
    content += addResearceAnnualBudget(ids, data);

    ids = getIds('FY' + year1);
    data = {};
    addData = {};
    data["proposals"] = reportdata.Q51;
    data["federalApplicationgoals"] = checkNull(reportdata.Q51_1_1);
    data["federalApplicationactual"] = checkNull(reportdata.Q51_2_1);
    data["stateApplicationgoals"] = checkNull(reportdata.Q51_1_2);
    data["stateApplicationactual"] = checkNull(reportdata.Q51_2_2);
    data["privateApplicationgoals"] = checkNull(reportdata.Q51_1_4);
    data["privateApplicationactual"] = checkNull(reportdata.Q51_2_4);

    addData = { 1: data["federalApplicationgoals"], 2: data["stateApplicationgoals"], 3: data["privateApplicationgoals"] };
    addData1 = { 1: data["federalApplicationactual"], 2: data["stateApplicationactual"], 3: data["stateApplicationactual"] };

    data["proposal_total_goals"] = add(addData);
    data["proposal_total_actual"] = add(addData1);

    data["awards"] = reportdata.Q52;
    data["federalAwardsgoals"] = checkNull(reportdata.Q52_1_1);
    data["federalAwardsactual"] = checkNull(reportdata.Q52_2_1);

    data["stateAwardsgoals"] = checkNull(reportdata.Q52_1_2);
    data["stateAwardsactual"] = checkNull(reportdata.Q52_2_2);

    data["privateAwardsgoals"] = checkNull(reportdata.Q52_1_4);
    data["privateAwardsactual"] = checkNull(reportdata.Q52_2_4);

    addData2 = { 1: data["federalAwardsgoals"], 2: data["stateAwardsgoals"], 3: data["privateAwardsgoals"] };
    addData3 = { 1: data["federalAwardsactual"], 2: data["stateAwardsactual"], 3: data["privateAwardsactual"] };


    data["awrds_total_goals"] = add(addData2);
    data["awrds_total_actual"] = add(addData3);

    data["largeScale"] = checkNull(reportdata.Q53);
    data["proposal_goals"] = checkNull(reportdata.Q53_1_1);
    data["proposal_actual"] = checkNull(reportdata.Q53_1_2);
    data["lsAwards_goals"] = checkNull(reportdata.Q53_2_1);
    data["lsAwards_actual"] = checkNull(reportdata.Q53_2_2);

    data["strr"] = checkNull(reportdata.Q54);

    data["stProposal_goals"] = checkNull(reportdata.Q54_1_1);
    data["stProposal_actual"] = checkNull(reportdata.Q54_1_2);

    data["stAwards_goals"] = checkNull(reportdata.Q54_2_1);
    data["stAwards_actual"] = checkNull(reportdata.Q54_2_2);

    content += adddetailedActivity(ids, data, year1);
    //detailed research

    ids = getIds('FY' + year1);
    data = {};
    data["publications"] = checkNull(reportdata.Q61);
    data["booksAuthoredgoals"] = checkNull(reportdata.Q61_1_1);
    data["bookauthoredsactual"] = checkNull(reportdata.Q61_1_2);

    data["bookschaptersgoals"] = checkNull(reportdata.Q61_2_1);
    data["bookschapteractual"] = checkNull(reportdata.Q61_2_2);


    data["publicationsgoals"] = checkNull(reportdata.Q61_3_1);
    data["publicationsactual"] = checkNull(reportdata.Q61_3_2);


    data["listofpublications"] = checkNull(reportdata.Q62);

    data["intellectualgoals"] = checkNull(reportdata.Q63_1_1);
    data["intellectualactual"] = checkNull(reportdata.Q63_1_2);

    data["patentsgoals"] = checkNull(reportdata.Q63_2_1);
    data["patentsactual"] = checkNull(reportdata.Q63_2_2);
    data["patlicenesedlgoals"] = checkNull(reportdata.Q63_3_1);
    data["patlicensedactual"] = checkNull(reportdata.Q63_3_2);


    data["patlicgoals"] = checkNull(reportdata.Q63_4_1);
    data["patlicactuals"] = checkNull(reportdata.Q63_4_2);

    data["licensedexecutedgoals"] = checkNull(reportdata.Q63_5_1);
    data["licensedexecutedactual"] = checkNull(reportdata.Q63_5_2);

    data["licensedrevenuegoals"] = checkNull(reportdata.Q63_6_1);
    data["licensedrevenueactual"] = checkNull(reportdata.Q63_6_2);

    data["startupcompaniesgoals"] = checkNull(reportdata.Q63_7_1);
    data["starupcomapnieseactual"] = checkNull(reportdata.Q63_7_2);

    data["listofintelletual"] = checkNull(reportdata.Q64);

    data["yougoaloffy19020"] = checkNull(reportdata.Q65_1);
    data["actualnumbers"] = checkNull(reportdata.Q65_2);

    data["listofkeynote"] = checkNull(reportdata.Q66);

    data["otheractivities"] = checkNull(reportdata.Q67);

    content += addresearchActivity(ids, data, year1);
    //****** */

    ids = getIds('FY' + year1);
    data = {};
    data["educationandtraining"] = checkNull(reportdata.Q71);
    data["students_goals_undergraduate"] = checkNull(reportdata.Q71_1_1);
    data["students_goals_graduate"] = checkNull(reportdata.Q71_1_2);
    data["students_goals_graduate_phd"] = checkNull(reportdata.Q71_1_4);
    data["students_goals_phd"] = checkNull(reportdata.Q71_1_5);

    data["students_actual_undergraduate"] = checkNull(reportdata.Q71_2_1);
    data["students_actual_graduate"] = checkNull(reportdata.Q71_2_2);
    data["students_actual_graduate_phd"] = checkNull(reportdata.Q71_2_4);
    data["students_actual_phd"] = checkNull(reportdata.Q71_2_5);

    data["nature_of_mentoring_undergradudate"] = checkNull(reportdata.Q71_3_1);
    data["nature_of_mentoring_graduate"] = checkNull(reportdata.Q71_3_2);
    data["nature_of_mentoring_graduate_phd"] = checkNull(reportdata.Q71_3_4);
    data["nature_of_mentoringl_phd"] = checkNull(reportdata.Q71_3_5);
    content += addEducation(ids, data);

    for (var i = 9; i < 14; i++) {
        ids = getIds('FY' + year1);
        let goal = new Goal(i - 8, reportdata["Q" + i + "1"], reportdata["Q" + i + "2"],
            reportdata["Q" + i + "3"], reportdata["Q" + i + "4"], reportdata["Q" + i + "5"],
            reportdata["Q" + i + "6"], reportdata["Q" + i + "7"]);
        content += addSmartGoal(ids, goal, year1);
    }

    ids = getIds('FY' + year1);
    data = [];
    if (ids.parentId == "FY2019") {
        if (reportdata.Q81_4 != '')
            data.push(reportdata.Q81_4);
        else
            data.push("N/A");
        if (reportdata.Q81_5 != '')
            data.push(reportdata.Q81_5);
        else
            data.push("N/A");
        if (reportdata.Q81_6 != '')
            data.push(reportdata.Q81_6);
        else
            data.push("N/A");
    }
    else {
        if (reportdata.Q81_4 != '')
            data.push(reportdata.Q81_4);
        else
            data.push("N/A");
        if (reportdata.Q81_5 != '')
            data.push(reportdata.Q81_5);
        else
            data.push("N/A");
        if (reportdata.Q81_6 != '')
            data.push(reportdata.Q81_6);
        else
            data.push("N/A");
        if (reportdata.Q81_7 != '')
            data.push(reportdata.Q81_7);
        else
            data.push("N/A");
        if (reportdata.Q81_8 != '')
            data.push(reportdata.Q81_8);
        else
            data.push("N/A");
    }

    content += addTopAchievements(ids, data);

    ids = getIds('FY' + year1);
    data = {};
    data["noofpartners"] = reportdata.Q141;
    if (reportdata.hasOwnProperty("partners"))
        data["partners"] = reportdata.partners;

    content += addList_partners(ids, data);

    ids = getIds('FY' + year1);
    data = {};
    data["opportunities"] = reportdata.Q151;
    data["challenges"] = reportdata.Q152;
    data["needs"] = reportdata.Q153;
    data["strategies"] = reportdata.Q154;
    data["suggestions"] = reportdata.Q155;
    content += addOtherThoughts(ids, data);
    content += '</div>'
    return content;
}

let addPlanningReport = function (reportdata, year1, year2) {

    let content = '';
    if (typeof reportdata === "undefined") {
        content = 'no content';
    }
    else {

        content += '<p><b>Director\'s Name: </b>' + reportdata.RecipientFirstName + ' ' + reportdata.RecipientLastName +
            '<br><b>Director\'s Email: </b>' + reportdata.RecipientEmail +
            '<br><b>Reporting Period: </b>July 1, ' + year1 + ' to June 30, ' + year2 +
            '<button type="button" style="float:right; background-color: #46166b; color:white ; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 2px; margin-right: 1px;text-align: center; margin: 0 auto;"onclick="printPlanningReport(\'researchcenter\')">Print</button>';

        content += '<div id = "FY' + year1 + '">';

        let ids = getIds('FY' + year1);
        let data = {};
        data["mission"] = reportdata.Q31;
        data["vision"] = reportdata.Q32;
        content += addMissionAndVision(ids, data);

        ids = getIds('FY' + year1);
        data = {};
        data["annualBudget"] = reportdata.Q41;
        data["employeesState"] = checkNull(reportdata.Q42_1_1);
        data["employeesRF"] = checkNull(reportdata.Q42_1_2);
        data["fteState"] = checkNull(reportdata.Q42_2_1);
        data["fteRF"] = checkNull(reportdata.Q42_2_2);
        content += addAnnualBudget(ids, data);



        ids = getIds('FY' + year1);
        data = {};
        data["proposals"] = reportdata.Q51;
        data["federalApplication"] = checkNull(reportdata.Q51_1_1);
        data["stateApplication"] = checkNull(reportdata.Q51_1_2);
        data["privateApplication"] = checkNull(reportdata.Q51_1_4);

        addData5 = { 1: data["federalApplication"], 2: data["stateApplication"], 3: data["privateApplication"] };

        data["proposal_total"] = add(addData5);
        data["awards"] = reportdata.Q52;
        data["federalAwards"] = checkNull(reportdata.Q52_1_1);
        data["stateAwards"] = checkNull(reportdata.Q52_1_2);
        data["privateAwards"] = checkNull(reportdata.Q52_1_4);

        addData6 = { 1: data["federalAwards"], 2: data["stateAwards"], 3: data["privateAwards"] };

        data["awrds_total"] = add(addData6);

        data["largeScale"] = checkNull(reportdata.Q53);
        data["proposal"] = checkNull(reportdata.Q53_1_1);
        data["lsAwards"] = checkNull(reportdata.Q53_2_1);

        data["strr"] = checkNull(reportdata.Q54);
        data["stProposal"] = checkNull(reportdata.Q54_1_1);
        data["stAwards"] = checkNull(reportdata.Q54_2_1);

        data["publications"] = checkNull(reportdata.Q55);
        data["booksAuthored"] = checkNull(reportdata.Q55_1_1);
        data["booksChapters"] = checkNull(reportdata.Q55_2_1);
        data["publicationsTable"] = checkNull(reportdata.Q55_3_1);


        data["technologyTransfer"] = checkNull(reportdata.Q56);
        data["intellectual"] = checkNull(reportdata.Q56_1_1);
        data["patentsApplications"] = checkNull(reportdata.Q56_2_1);
        data["patentsIssued"] = checkNull(reportdata.Q56_3_1);
        data["patentsLicensed"] = checkNull(reportdata.Q56_4_1);
        data["licensedExecuted"] = checkNull(reportdata.Q56_5_1);
        data["licensedRevenue"] = checkNull(reportdata.Q56_6_1);
        data["startupCompanies"] = checkNull(reportdata.Q56_7_1);

        data["conference"] = checkNull(reportdata.Q57);
        data["goals"] = checkNull(reportdata.Q57_1);

        data["education"] = checkNull(reportdata.Q58);
        data["undergraduate"] = checkNull(reportdata.Q58_1_1);
        data["graduate_masters"] = checkNull(reportdata.Q58_1_2);
        data["graduate_phd"] = checkNull(reportdata.Q58_1_4);
        data["post"] = checkNull(reportdata.Q58_1_5);
        content += addResearchPerformancetarget(ids, data, year1);

        for (var i = 7; i < 12; i++) {
            ids = getIds('FY' + year1);
            let goal = new GoalPlan(i - 6, reportdata["Q" + i + "1"], reportdata["Q" + i + "2"],
                reportdata["Q" + i + "3"], reportdata["Q" + i + "4"], reportdata["Q" + i + "5"],
                reportdata["Q" + i + "6"], reportdata["Q" + i + "7"], reportdata["Q" + i + "8"]);
            content += addSmartGoalPlan(ids, goal, year1);
        }
        content += '</div>'

    }
    return content;
}

let addResearchPerformancetarget = function (ids, data, year) {
    let period = getPeriod(year);
    let researchContent = '<h4> RESEARCH PERFORMANCE TARGET </h4>' +
        '<div class="annual-budget">' +
        '<h4> The target numbers are indicated below:</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;">' +
        '</td><th class="border_bottom" width="36.5%">Your Goal for FY ' + period + '</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">Federal Applications</th>' +
        '<td>' + data.federalApplication + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">State Application</th><td>' +
        data.stateApplication + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Private Application</th><td>' +
        data.privateApplication + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Total</th><td>' +
        data.proposal_total + '</td></tr>' +

        '</tbody></table></div>' +
        '</br>' +
        '</br>' +

        '<h4>AWARDS </h4>' +
        '<div class="annual-budget">' +
        '<h4> The target numbers are indicated below:</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;">' +
        '</td><th class="border_bottom" width="36.5%">Your Goal for FY ' + period + '</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">Federal Awards</th>' +
        '<td>' + data.federalAwards + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">State Awards</th><td>' +
        data.stateAwards + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Private Awards</th><td>' +
        data.privateAwards + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Total</th><td>' +
        data.awrds_total + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +

        '<h4>LARGE-SCALE PROPOSALS/AWARDS </h4>' +
        '<div class="annual-budget">' +
        '<h4> Number of target for Large-Scale*, Multi-Investigator Proposals/Awards with Multi-Institutions</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;">' +
        '</td><th class="border_bottom" width="36.5%">Your Goal for FY ' + period + '</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">#Proposals</th>' +
        '<td>' + data.proposal + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">#Awards</th><td>' +
        data.lsAwards + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +



        '<h4>STRR/SBIR PROPOSALS/AWARDS </h4>' +

        '<div class="annual-budget">' +
        '<h4> The target numbers are indicated below: </h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;">' +
        '</td><th class="border_bottom" width="36.5%">Your Goal for FY ' + period + '</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">#Proposals</th>' +
        '<td>' + data.stProposal + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">#Awards</th><td>' +
        data.stAwards + '</td></tr>' +
        '</tbody></table></div>' +

        '</br>' +
        '</br>' +


        '<h4>PUBLICATIONS </h4>' +
        '<div class="annual-budget">' +
        '<h4>  The target numbers are indicated below:</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;">' +
        '</td><th class="border_bottom" width="36.5%">Your Goal for FY ' + period + '</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">Books-Authored/Edited</th>' +
        '<td>' + data.booksAuthored + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Books Chapters - Authored/Edited </th><td>' +
        data.booksChapters + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Publications</th><td>' +
        data.publicationsTable + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +



        '<h4>TECHNOLOGY TRANSFER/COMMERCIALIZATION  </h4>' +

        '<div class="annual-budget">' +
        '<h4> The target numbers are indicated below:</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;">' +
        '</td><th class="border_bottom" width="36.5%">Your Goal for FY ' + period + '</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">Intellectual Property Disclosures</th>' +
        '<td>' + data.intellectual + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Patents Applications</th><td>' +
        data.patentsApplications + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Patents Isssued</th><td>' +
        data.patentsIssued + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Patents Licensed</th><td>' +
        data.patentsLicensed + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Licenses Executed</th><td>' +
        data.licensedExecuted + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Licenses Revenue</th><td>' +
        data.licensedRevenue + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Start-up Companies</th><td>' +
        data.startupCompanies + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +

        '<h4>CONFERENCE/SEMINAR PRESENTATIONS </h4>' +

        '<div class="annual-budget">' +
        '<h4> The target numbers are indicated below:</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;">' +
        '</td><th class="border_bottom" width="36.5%">Your Goal for FY ' + period + '</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">Your Goal for FY ' + period + '</th>' +
        '<td>' + data.goals + '</td></tr>' +

        '</tbody></table></div>' +
        '</br>' +

        '<h4>EDUCATION AND TRAINING </h4>' +

        '<div class="annual-budget">' +
        '<h4>Number of Undergraduate/Graduate/Postdoc Trained.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;">' +
        '</td><th class="border_bottom" width="36.5%">#Students - Your Goal for FY ' + period + '</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">Undergraduate</th>' +
        '<td>' + data.undergraduate + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Graduate - Master</th><td>' +
        data.graduate_masters + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Graduate - PhD</th><td>' +
        data.graduate_phd + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Postdoctoral</th><td>' +
        data.post + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>';

    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Research Performanace Target ", researchContent);
}

let addMissionAndVision = function (ids, data) {
    let misionandvision = '<h4>MISSION</h4>' +
        '<p class="mission">' + data.mission + '</p>' +
        '<h4>VISION</h4>' +
        '<p class="vision">' + data.vision + '</p>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Mission and Vision", misionandvision);
}

let addAnnualBudget = function (ids, data) {
    let employeesStateTwoDecimal = Math.round(data.employeesState * 100 + Number.EPSILON) / 100;
    let budgetContent = '<h4> ANNUAL BUDGET </h4>' +
        '<div class="annual-budget">' +
        '<h4> Number of State and RF Employees/FTEs.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td><th class="border_bottom" width="36.5%">State</th><th class="border_bottom" width="36.5%">RF</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">#Employees (Headcounts)</th><td>' + employeesStateTwoDecimal + '</td><td>' +
        data.employeesRF + '</td></tr>' + '<tr><th class="border_right">#FTEs</th><td>' + data.fteState + '</td><td>' +
        data.fteRF + '</td></tr></tbody></table></div>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Annual Budget", budgetContent);
}


let addResearceAnnualBudget = function (ids, data) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    let totalBudget = formatter.format(data.nameOfadditionalsource1 + data.nameOfadditionalsource2 + data.nameOfadditionalsource3);
    let currencyFormat1 = formatter.format(data.nameOfadditionalsource1);
    let currencyFormat2 = formatter.format(data.nameOfadditionalsource2);
    let currencyFormat3 = formatter.format(data.nameOfadditionalsource3);


    let financialbudgetContent = '<h4> ANNUAL BUDGET </h4>' +
        '<div class="annual-budget"><p>' + data.annualBudget + '</p>' +
        '<h4> Number of State and RF Employees/FTEs.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">State</th><th class="border_bottom" width="36.5%">RF</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">#Employees (Headcounts)</th><td>' + data.employeesState + '</td><td>' +
        data.employeesRF + '</td></tr>' +
        '<tr><th class="border_right">#FTEs</th><td>' + data.fteState + '</td><td>' +
        data.fteRF + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +
        '<div class="annual-budget"> ' +
        '<h4> Source of Other Revenue Generated</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Funding Source</th><th class="border_bottom" width="36.5%">Amount</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Name of Additional Source 1 </th><td>' + data.nameOfadditionalsource11 + '</td><td>' +
        currencyFormat1 + '</td></tr>' +
        '<tr><th class="border_right">Name of Additional Source 2</th><td>' + data.nameOfadditionalsource21 + '</td><td>' +
        currencyFormat2 + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Name of Additional Source 3 </th><td>' + data.nameOfadditionalsource31 + '</td><td>' +
        currencyFormat3 + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Total </th><td>' + data.total3 + '</td><td>' +
        totalBudget + '</td></tr>' +
        '</tbody></table></div>';



    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Financial Summary Budget", financialbudgetContent);
}


let adddetailedActivity = function (ids, data, year) {
    let period = getPeriod(year);
    let proposal_total_actual = data.federalApplicationactual + data.stateApplicationactual + data.privateApplicationactual;
    let detailedActivity = '<h4> PROPOSALS</h4>' +
        '<div class="annual-budget">' +
        '<h4> Number of Research Proposals Submitted to Extramural Sponsors</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Federal Applications</th><td>' + data.federalApplicationgoals + '</td><td>' +
        data.federalApplicationactual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top ">State Applications</th><td>' + data.stateApplicationgoals + '</td><td>' +
        data.stateApplicationactual + '</td></tr>' +

        '<tr><th class="border_right  padding_bottom padding_top ">Private/Other Sponsors Applications</th><td>' + data.privateApplicationgoals + '</td><td>' +
        data.privateApplicationactual + '</td></tr>' +

        '<tr><th class="border_right  padding_bottom padding_top">Total</th><td>' + data.proposal_total_goals + '</td><td>' +
        proposal_total_actual + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +

        '<h4> AWARDS</h4>' +
        '<div class="annual-budget">' +
        '<h4> Numbers of Awards Received from Extramural Sponsors  </h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Federals Awards </th><td>' + data.federalAwardsgoals + '</td><td>' +
        data.federalAwardsactual + '</td></tr>' +
        '<tr><th class="border_right">State Awards </th><td>' + data.stateAwardsgoals + '</td><td>' +
        data.stateAwardsactual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Private Awards </th><td>' + data.privateAwardsgoals + '</td><td>' +
        data.privateAwardsactual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Total </th><td>' + data.awrds_total_goals + '</td><td>' +
        data.awrds_total_actual + '</td></tr>' +
        '</tbody></table></div>' +

        '</br>' +
        '</br>' +
        '<h4> LARGE SCALE PROPOSALS/AWARDS</h4>' +

        '<div class="annual-budget">' +
        '<h4> Number of Large Scale Proposals/Awards </h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">#Proposals </th><td>' + data.proposal_goals + '</td><td>' +
        data.proposal_actual + '</td></tr>' +
        '<tr><th class="border_right">#Awards </th><td>' + data.lsAwards_goals + '</td><td>' +
        data.lsAwards_actual + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +

        '<h4>STTR/SBIR PROPOSALS/AWARDS</h4>' +


        '<div class="annual-budget">' +
        '<h4>Numbers of STTR/SBIR Proposals/Awards</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">#Proposals </th><td>' + data.stProposal_goals + '</td><td>' +
        data.stProposal_actual + '</td></tr>' +
        '<tr><th class="border_right">#Awards </th><td>' + data.stAwards_goals + '</td><td>' +
        data.stAwards_actual + '</td></tr>' +
        '</tbody></table></div>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Detailed Activity Report Proposal and Awards", detailedActivity);
}


let addresearchActivity = function (ids, data, year) {

    let period = getPeriod(year);
    let researchActivity = '<h4> PUBLICATIONS </h4>' +
        '<div class="annual-budget">' +
        '<h4>Number of Publications by Center/Institute/Lab in the past FY</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Books Authored/Edited </th><td>' + data.booksAuthoredgoals + '</td><td>' +
        data.bookauthoredsactual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top">Books Chapters Authored/Edited  </th><td>' + data.bookschaptersgoals + '</td><td>' +
        data.bookschapteractual + '</td></tr>' +

        '<tr><th class="border_right padding_bottom padding_top ">Publications</th><td>' + data.publicationsgoals + '</td><td>' +
        data.publicationsactual + '</td></tr>' +

        '</tbody></table></div>' +
        '</br>' +
        '</br>' +


        '<h4>List of Publications by Center/Institute/Lab in the past FY</h4>' +

        '<div class="annual-budget">' + formatPara(data.listofpublications) +
        '</div>' +

        '</br>' +
        '</br>' +



        '<h4> TECHNOLOGY TRANSFER/COMMERCIALIZATION </h4>' +
        '<div class="annual-budget">' +
        '<h4>Number of Intellectual Property/Technology Transfer/Commercialization in the Past FY </h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Intellectual Property Disclosures </th><td>' + data.intellectualgoals + '</td><td>' +
        data.intellectualactual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top">Patents Applications </th><td>' + data.patentsgoals + '</td><td>' +
        data.patentsactual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Patents Issued  </th><td>' + data.patlicenesedlgoals + '</td><td>' +
        data.patlicensedactual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Patents Licensed </th><td>' + data.patlicgoals + '</td><td>' +
        data.patlicactuals + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">License Executed </th><td>' + data.licensedexecutedgoals + '</td><td>' +
        data.licensedexecutedactual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">License Revenue </th><td>' + data.licensedrevenuegoals + '</td><td>' +
        data.licensedrevenueactual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Start-up Companies </th><td>' + data.startupcompaniesgoals + '</td><td>' +
        data.starupcomapnieseactual + '</td></tr>' +
        '</tbody></table></div>' +

        '</br>' +
        '</br>' +



        '<h4>List of Intellectual Property/Technology Transfer/Commercialization in the Past FY </h4>' +

        '<div class="annual-budget"><p>' + formatPara(data.listofintelletual) + '</p>' +
        '</div>' +

        '<br/>' +

        '<br/>' +



        '<h4> CONFERENCE/SEMINAR PRESENTATIONS</h4>' +

        '<div class="annual-budget">' +
        '<h4> Numbers of all Keynote Address or Plenary Invited Presentations</h4>' +
        '<table width="100%">' +
        '<tbody><tr>' +
        '<th class="padding_bottom padding_top">Your Goals for FY ' + period + ' </th><td>' + data.yougoaloffy19020 + '</td></tr>' +
        '<tr><th class="">Actual Numbers </th><td>' + data.actualnumbers + '</td>' +
        '</tbody></table></div>' +
        '<br/>' +

        '<br/>' +


        '<h4> List of all Keynote Address or Plenary Invited Presentations </h4>' +

        '<div class="annual-budget"><p>' + formatPara(data.listofkeynote) + '</p>' +

        '</div>' +
        '<br/>' +
        '<br/>' +

        '<h4> OTHER ACTIVITIES</h4>' +

        '<h4>List of Scholarly Activity:</h4>' +

        '<div class="annual-budget"><p>' + formatPara(data.otheractivities) + '</p>' +
        '</div>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Detailed Activity Report Research and Scholarly Activities", researchActivity);
}
/* research end */
let addEducation = function (ids, data, year) {
    let period = getPeriod(year);
    let eduContent = '<h4> EDUCATION AND TRAINING </h4>' +
        '<div class="annual-budget">' +
        '<h4> Number of Undergraduate/Graduate/Postdoc Trained.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td><th class="border_bottom" width="25%">Undergraduate</th>' +
        '<th class="border_bottom" width="25%">Graduate - Master </th>' +
        '<th class="border_bottom" width=25%">Graduate - PhD </th>' +
        '<th class="border_bottom" width="25%">Postdoctoral </th>' +
        '</tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">#Students - Your Goal for FY ' + period + '</th><td>' + data.students_goals_undergraduate + '</td>' +
        '<td>' + data.students_goals_graduate + '</td> ' +
        '<td>' + data.students_goals_graduate_phd + '</td> ' +
        '<td>' + data.students_goals_phd + '</td> ' +
        '</tr>' +
        '<tr><th class="border_right padding_bottom padding_top">#Students - Actual Numbers</th><td>' + data.students_actual_undergraduate + '</td>' +
        '<td>' + data.students_actual_graduate + '</td> ' +
        '<td>' + data.students_actual_graduate_phd + '</td> ' +
        '<td>' + data.students_actual_phd + '</td> ' +
        '</tr>' +
        '<tr><th class="border_right padding_bottom padding_top"> Nature of Mentoring</th><td>' + data.nature_of_mentoring_undergradudate + '</td>' +
        '<td>' + data.nature_of_mentoring_graduate + '</td> ' +
        '<td>' + data.nature_of_mentoring_graduate_phd + '</td> ' +
        '<td>' + data.nature_of_mentoringl_phd + '</td> ' +
        '</tr>' +
        '</tbody></table></div>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Education And Training", eduContent);
}


let addList_partners = function (ids, data) {
    let content =
        '<h4> LIST OF PARTNERS/AFFILIATES</h4>' +

        '<div class="partners"><p>Total No. of Partners: ' + data.noofpartners + '</p>';
    let partners = data.hasOwnProperty("partners") ? data["partners"] : [];
    if (partners.length > 0) {
        content += '<table class="table thead-dark table-hover">' +
            '<thead><tr>' +
            '<th scope="col">#</th>' +
            '<th scope="col">Details</th>' +
            '</tr></thead>' +
            '<tbody>';
        var i = 0;
        partners.forEach(element => {
            i++;
            content += '<tr><th scope="row">' + i + '</th>' +
                '<td><p>Full Name : ' + element["FullName"] + '<br/>';
            if (element.hasOwnProperty("JobTitle") && element["JobTitle"] != '')
                content += 'Job Title : ' + element["JobTitle"] + '<br/>';
            if (element.hasOwnProperty("Department") && element["Department"] != '')
                content += 'Department : ' + element["Department"] + '<br/>';
            if (element.hasOwnProperty("School") && element["School"] != '')
                content += 'School: ' + element["School"] + '<br/>';
            if (element.hasOwnProperty("Organization(IfnotUAlbany)") && element["Organization(IfnotUAlbany)"] != '')
                content += 'Organization : ' + element["Organization(IfnotUAlbany)"] + '<br/>';
            if (element.hasOwnProperty("Email") && element["Email"] != '')
                content += 'Email : <a href="mailto:' + element["Email"] + '">' + element["Email"] + '</a></td>';
            content += '</tr>';
        });
        content += '</tbody></table>';
    }
    content += '</div>';

    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "List of Partners/Affiliates", content);
}

let addOrganizationalMemberships = function (ids, data) {
    let organizations = '<ul class="num-list">';
    for (var i = 1; i < 7; i++) {
        if (data['membership' + i] != "")
            organizations += '<li>' + data['membership' + i] + '</li>';
    }
    organizations += '</ul>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Active Organizational Memberships", organizations);
}

let addHonors = function (collapseId, headerId, parentId, childId, data) {
    return generateAccordionElem(1, collapseId, headerId, parentId, childId, "Staff Honors, Awards, Other", data.Q71);
}

let addSmartGoal = function (ids, goal, year) {
    let period = getPeriod(year);
    let smartgoal = '<h4>FY ' + period + ' SMART GOAL ' + goal.no + '</h4>';
    if (year == "2020") {
        smartgoal += '<div class="goal"><p><b>Goal: </b>' + (goal.goal == '' ? 'N/A' : formatText(goal.goal)) + '</p>';
        smartgoal += "<p><b>Action(s): </b>" + (goal.actions == '' ? 'N/A' : formatText(goal.action)) + '</p>';
        smartgoal += "<p><b>Metric(s): </b>" + (goal.metric == '' ? 'N/A' : formatText(goal.metric)) + '</p>';
        let time = (isNaN(goal.timeFrame) || goal.timeFrame == '') ? (goal.timeFrame == '' ? 'N/A' : goal.timeFrame) : getDate(goal.timeFrame);
        smartgoal += "<p><b>Goal Evaluation Time Frame: </b>" + time + '</p></div>';
        smartgoal += '<div class="goalresult"><p><b>Actions Implemented: </b>' + (goal.actionsImplemented == '' ? 'N/A' : formatText(goal.actionsImplemented)) + '</p>';
        smartgoal += '<p><b>Noteworthy Results of Assessment: </b>' + (goal.results == '' ? 'N/A' : formatText(goal.results)) + '</p>';
        smartgoal += '<p><b>Changes Made/Planned: </b>' + (goal.changes == '' ? 'N/A' : formatText(goal.changes)) + '</p></div>';
    }
    else {
        smartgoal += '<div class="goal"><p><b>Goal: </b>' + (goal.goal == '' ? 'N/A' : formatText(goal.goal)) + '</p>';
        smartgoal += "<p><b>Actions Implemented: </b>" + (goal.actions == '' ? 'N/A' : formatText(goal.action)) + '</p>';
        smartgoal += "<p><b>Noteworthy Results: </b>" + (goal.metric == '' ? 'N/A' : formatText(goal.metric)) + '</p>';
        let time = (isNaN(goal.timeFrame) || goal.timeFrame == '') ? (goal.timeFrame == '' ? 'N/A' : goal.timeFrame) : getDate(goal.timeFrame);
        smartgoal += "<p><b>Changes Made/Planned: </b>" + time + '</p></div>';
    }
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "SMART Goal " + goal.no, smartgoal);
}

let addTopAchievements = function (ids, data) {
    let achievements = '<div class="achievements">';
    for (var i = 0; i < data.length; i++) {
        achievements += '<p><b>Achievement ' + (i + 1) + ': </b><p>';
        achievements += formatText(data[i]);
    }
    achievements += "</div>";
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Top 3-5 Achievements", achievements);
}

let addOtherThoughts = function (ids, data) {
    let otherthoughts = '<div class="other-thoughts"><p><b>Big Opportunities: </b>' + (data.opportunities == '' ? 'N/A' : data.opportunities) + '</p>' +
        '<p><b>Big Challenges: </b>' + (data.challenges == '' ? 'N/A' : data.challenges) + '</p>' +
        '<p><b>Resource Needs: </b>' + (data.needs == '' ? 'N/A' : data.needs) + '</p>' +
        '<p><b>Strategy Suggestions to Grow Research: </b>' + (data.strategies == '' ? 'N/A' : data.strategies) + '</p>' +
        '<p><b>Other Thoughts and Suggestions: </b>' + (data.suggestions == '' ? 'N/A' : data.suggestions) + '</p></div>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Other Thoughts and Suggestions", otherthoughts);
}

let addSmartGoalPlan = function (ids, goal, year) {
    let period = getPeriod(year);
    let smartgoal = '<h4>FY ' + period + ' SMART GOAL ' + goal.no + '</h4>';
    smartgoal += '<div class="goal"><p><b>Goal: </b>' + (goal.goal == '' ? 'N/A' : formatText(goal.goal)) + '</p>';
    smartgoal += "<p><b>Action(s): </b>" + (goal.action == '' ? 'N/A' : goal.action) + '</p>';
    smartgoal += "<p><b>Metric(s): </b>" + (goal.metric == '' ? 'N/A' : goal.metric) + '</p>';
    let time = (isNaN(goal.timeFrame) || goal.timeFrame == '') ? (goal.timeFrame == '' ? 'N/A' : goal.timeFrame) : getDate(goal.timeFrame);
    smartgoal += "<p><b>Goal Evaluation Time Frame: </b>" + time + '</p>';
    smartgoal += '<p><b>Primary Leader on this Project: </b>' + (goal.primaryLeader == '' ? 'N/A' : goal.primaryLeader) + '</p>';
    smartgoal += '<p><b>Circumstances That Could Impact Workplan: </b>' + (goal.circumstances == '' ? 'N/A' : goal.circumstances) + '</p>';
    smartgoal += '<p><b>Most Important Collaborating Units/Offices: </b>' + (goal.collaborations == '' ? 'N/A' : goal.collaborations) + '</p>';
    smartgoal += '<p><b>Impact on Research Excellence (Campus Strategic Priorities): </b>' + (goal.impact == '' ? 'N/A' : goal.impact) + '</p>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "SMART Goal " + goal.no, smartgoal);
}