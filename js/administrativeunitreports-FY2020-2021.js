let dataURL = "data/administrativeunitreports-FY2020-2021.json";
//getting content Element to append grants information
window.onload = function () {
    let request = axios.get(dataURL);
    axios.all([request]).then(axios.spread((...responses) => {
        let responsedata = responses[0].data;
        localStorage.clear();
        localStorage.setItem("data", JSON.stringify(responsedata));

        let units = getDistinctAttributes(responsedata.data, "ExternalReference");
        let validunits = [];
        for (i = 0; i < units.length; i++) {
            if (units[i] != "")
                validunits.push(units[i]);
        }
        let headercontent = ' <select id="selectunit" onchange="changeReportUnit()">';
        for (i = 0; i < validunits.length; i++) {
            headercontent = headercontent + '<option value="' + validunits[i] + '">' + validunits[i] + '</option>';
        }
        headercontent = headercontent + '</select> ' + responsedata.FY;
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

let addAssessmentReport = function (reportdata, year1, year2) {
    let content = '';
    content += '<p><b>Director\'s Name: </b>' + reportdata.RecipientFirstName + ' ' + reportdata.RecipientLastName +
        '<br><b>Director\'s Email: </b>' + reportdata.RecipientEmail +
        '<br><b>Reporting Period: </b>July 1, ' + year1 + ' to June 30, ' + year2 +
        '<button type="button" style="float:right; background-color: #46166b; color:white ; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 2px; margin-right: 1px;text-align: center; margin: 0 auto;"onclick="printAssessmentReport(\'admin\')">Print</button>';
    content += '<div id = "FY' + year1 + '">';

    let ids = getIds('FY' + year1);
    let data = {};
    if (year1 == '2019') {
        data["mission"] = reportdata["1819Mission"];
        data["vision"] = reportdata["1819Vision"];
    }
    else {
        data["mission"] = reportdata.Q31;
        data["vision"] = reportdata.Q32;
    }
    content += addMissionAndVision(ids, data);

    ids = getIds('FY' + year1);
    data = {};
    data["annualBudget"] = reportdata.Q41;
    data["employeesState"] = reportdata.Q42_1_1;
    data["employeesRF"] = reportdata.Q42_1_2;
    data["fteState"] = reportdata.Q42_2_1;
    data["fteRF"] = reportdata.Q42_2_2;
    content += addAnnualBudget(ids, data);
    if (reportdata.Q51 == 'Yes') {
        data["member1"] = reportdata.Q51;
        ids = getIds('FY' + year1);
        data = {};
        for (var i = 1; i < 7; i++) {
            data['membership' + i] = reportdata["Q52_" + i];
            data['benefit' + i] = reportdata["Q61_" + i];
        }
        content += addOrganizationalMemberships(ids, data);
    }

    for (var i = 8; i < 13; i++) {
        if (i > 10 && reportdata.Q105 === 'No') {
            break;
        }
        ids = getIds('FY' + year1);
        let no = i - 7;
        if (year1 == 2019) {
            let goal = new Goal(no, reportdata["1819Goal" + no], reportdata["1819Activities" + no],
                reportdata["1819Metrics" + no], reportdata["1819Timeframe" + no], reportdata["Q" + i + "2"], reportdata["Q" + i + "3"], reportdata["Q" + i + "4"]);
            content += addSmartGoal(ids, goal, year1);
        }
        else {
            let goal = new Goal(no, reportdata["Q" + i + "1"], reportdata["Q" + i + "2"],
                reportdata["Q" + i + "3"], reportdata["Q" + i + "4"], reportdata["Q" + i + "5"], reportdata["Q" + i + "6"], reportdata["Q" + i + "7"]);
            content += addSmartGoal(ids, goal, year1);
        }
    }

    ids = getIds('FY' + year1);
    data = [];
    if (ids.parentId == "FY2020") {
        if (reportdata.Q131_8 != '' && reportdata.Q83 != '')
            data.push(reportdata.Q83);
        if (reportdata.Q131_9 != '' && reportdata.Q93 != '')
            data.push(reportdata.Q93);
        if (reportdata.Q131_13 != '' && reportdata.Q103 != '')
            data.push(reportdata.Q103);
        if (reportdata.Q131_11 != '' && reportdata.Q113 != '')
            data.push(reportdata.Q113);
        if (reportdata.Q131_12 != '' && reportdata.Q123 != '')
            data.push(reportdata.Q123);
        if (reportdata.Q132_4 != '')
            data.push(reportdata.Q132_4);
        if (reportdata.Q132_5 != '')
            data.push(reportdata.Q132_5);
        if (reportdata.Q132_6 != '')
            data.push(reportdata.Q132_6);
        if (reportdata.Q132_7 != '')
            data.push(reportdata.Q132_7);
        if (reportdata.Q132_8 != '')
            data.push(reportdata.Q132_8);
    }
    else {
        if (reportdata.Q131_8 != '' && reportdata.Q83 != '')
            data.push(reportdata.Q83);
        if (reportdata.Q131_9 != '' && reportdata.Q93 != '')
            data.push(reportdata.Q93);
        if (reportdata.Q131_13 != '' && reportdata.Q103 != '')
            data.push(reportdata.Q103);
        if (reportdata.Q131_11 != '' && reportdata.Q113 != '')
            data.push(reportdata.Q113);
        if (reportdata.Q131_12 != '' && reportdata.Q123 != '')
            data.push(reportdata.Q123);
        if (reportdata.Q132_4 != '')
            data.push(reportdata.Q132_4);
        if (reportdata.Q132_5 != '')
            data.push(reportdata.Q132_5);
        if (reportdata.Q132_6 != '')
            data.push(reportdata.Q132_6);
    }


    content += addTopAchievements(ids, data);

    ids = getIds('FY' + year1);
    data = {};
    data["opportunities"] = reportdata.Q141;
    data["challenges"] = reportdata.Q142;
    data["needs"] = reportdata.Q143;
    data["strategies"] = reportdata.Q144;
    data["suggestions"] = reportdata.Q145;
    content += addOtherThoughts(ids, data);
    content += '</div>'
    return content;
}

let addPlanningReport = function (reportdata, year1, year2) {
    let content = '';
    content += '<p><b>Director\'s Name: </b>' + reportdata.RecipientFirstName + ' ' + reportdata.RecipientLastName +
        '<br><b>Director\'s Email: </b>' + reportdata.RecipientEmail +
        '<br><b>Reporting Period: </b>July 1, ' + year1 + ' to June 30, ' + year2 +
        '<button type="button" style="float:right; background-color: #46166b; color:white ; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 2px; margin-right: 1px;text-align: center; margin: 0 auto;"onclick="printPlanningReport(\'admin\')">Print</button>';
    content += '<div id = "FY' + year2 + '">';

    let ids = getIds('FY' + year2);
    let data = {};
    data["mission"] = reportdata.Q31;
    data["vision"] = reportdata.Q32;
    content += addMissionAndVision(ids, data);

    ids = getIds('FY' + year2);
    data = {};
    data["annualBudget"] = reportdata.Q41;
    data["employeesState"] = reportdata.Q42_1_1;
    data["employeesRF"] = reportdata.Q42_1_2;
    data["fteState"] = reportdata.Q42_2_1;
    data["fteRF"] = reportdata.Q42_2_2;
    content += addAnnualBudget(ids, data);

    for (var i = 6; i < 11; i++) {
        ids = getIds('FY' + year2);
        let goal = new GoalPlan(i - 5, reportdata["Q" + i + "1"], reportdata["Q" + i + "2"],
            reportdata["Q" + i + "3"], reportdata["Q" + i + "4"], reportdata["Q" + i + "5"],
            reportdata["Q" + i + "6"], reportdata["Q" + i + "7"], reportdata["Q" + i + "8"]);
        content += addSmartGoalPlan(ids, goal, year1);
    }
    content += '</div>'
    return content;
}

let addMissionAndVision = function (ids, data) {
    let misionandvision = '<h4>MISSION</h4>' +
        '<p class="mission">' + data.mission + '</p>' +
        '<h4>VISION</h4>' +
        '<p class="vision">' + data.vision + '</p>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Mission and Vision", misionandvision);
}

let addAnnualBudget = function (ids, data) {
    let budgetContent = '<h4> ANNUAL BUDGET </h4>' +
        '<div class="annual-budget"><p>' + data.annualBudget + '</p>' +
        '<h4> Indicate below, the number of State and RF Employees/FTEs.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td><th class="border_bottom" width="36.5%">State</th><th class="border_bottom" width="36.5%">RF</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">#Employees (Headcounts)</th><td>' + data.employeesState + '</td><td>' +
        data.employeesRF + '</td></tr>' + '<tr><th class="border_right">#FTEs</th><td>' + data.fteState + '</td><td>' +
        data.fteRF + '</td></tr></tbody></table></div>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Annual Budget", budgetContent);
}

let addOrganizationalMemberships = function (ids, data) {
    let organizations = '<div><table width="100%"><thead><tr><th class="border_bottom border_right" width="36.5%">Name of Organization/Membership​</th><th class="border_bottom" width="36.5%">Benefits</th></tr></thead><tbody>';

    for (var i = 1; i < 7; i++) {
        if (data['membership' + i] != "")
            organizations += '<tr><td style="text-align: left;" class="border_right border_bottom">' + data['membership' + i] + '</td>';
        if (data['benefit' + i] != "")
            organizations += '<td class="border_bottom" style="text-align: left;">' + data['benefit' + i] + '</td></tr>';
    }
    organizations += '</tbody></table></div>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Active Organizational Memberships", organizations);
}

let addHonors = function (collapseId, headerId, parentId, childId, data) {
    return generateAccordionElem(1, collapseId, headerId, parentId, childId, "Staff Honors, Awards, Other", data.Q71);
}


let addSmartGoal = function (ids, goal, year) {
    let period = getPeriod(year);
    let smartgoal = '<h4>FY ' + period + ' SMART GOAL ' + goal.no + '</h4>';
    smartgoal += '<div class="goal"><p><b>Goal: </b>' + (goal.goal == '' ? 'N/A' : formatText(goal.goal)) + '</p>';
    smartgoal += "<p><b>Action(s): </b>" + (goal.action == '' ? 'N/A' : formatText(goal.action)) + '</p>';
    smartgoal += "<p><b>Metric(s): </b>" + (goal.metric == '' ? 'N/A' : formatText(goal.metric)) + '</p>';
    let time = (isNaN(goal.timeFrame) || goal.timeFrame == '') ? (goal.timeFrame == '' ? 'N/A' : goal.timeFrame) : getDate(goal.timeFrame);
    smartgoal += "<p><b>Goal Evaluation Time Frame: </b>" + time + '</p></div>';
    smartgoal += '<div class="goalresult"><p><b>Actions Implemented: </b>' + (goal.actionsImplemented == '' ? 'N/A' : formatText(goal.actionsImplemented)) + '</p>';
    smartgoal += '<p><b>Noteworthy Results of Assessment: </b>' + (goal.results == '' ? 'N/A' : formatText(goal.results)) + '</p>';
    smartgoal += '<p><b>Changes Made/Planned: </b>' + (goal.changes == '' ? 'N/A' : formatText(goal.changes)) + '</p></div>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "SMART Goal " + goal.no, smartgoal);
}


let achievementsData = function (reportdata) {
    let data = [];
    if (reportdata.Q132_4.trim() != '')
        data.push(reportdata.Q132_4);
    if (reportdata.Q132_5.trim() != '')
        data.push(reportdata.Q132_5);
    if (reportdata.Q132_6.trim() != '')
        data.push(reportdata.Q132_6);

    if (data.size() == 3)
        return data;
    let data1 = [];
    if (reportdata.Q132_7.trim() != '')
        data.push(reportdata.Q132_7);
    if (reportdata.Q132_8.trim() != '')
        data.push(reportdata.Q132_8);
    if (data.length + data1.length == 5) {
        data1.concat(data);
        return data1;
    }
    if (reportdata.Q131_9.trim() != '')
        data1.push(reportdata.Q93);
    if (data.length + data1.length == 3) {
        data1.concat(data);
        return data1;
    }
    if (reportdata.Q131_9.trim() != '')
        data1.push(reportdata.Q93);
    if (data.length + data1.length == 3) {
        data1.concat(data);
        return data1;
    }
    if (reportdata.Q131_13.trim() != '')
        data1.push(reportdata.Q103);
    if (data.length + data1.length == 3) {
        data1.concat(data);
        return data1;
    }
    if (reportdata.Q131_11.trim() != '')
        data1.push(reportdata.Q113);
    if (data.length + data1.length == 3) {
        data1.concat(data);
        return data1;
    }
    if (reportdata.Q131_12.trim() != '')
        data1.push(reportdata.Q123);
    if (data.length + data1.length == 3) {
        data1.concat(data);
        return data1;
    }
    return data;
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
