let dataURL = "data/researchcenterreports-FY 19-20.json";
//getting content Element to append grants information
window.onload = function () {
    let request = axios.get(dataURL);
    axios.all([request]).then(axios.spread((...responses) => {
        let responsedata = responses[0].data;
        localStorage.clear();
        localStorage.setItem("data", JSON.stringify(responsedata));

        let units = getDistinctAttributes(responsedata.data, "Unit");
        let validunits = [];
        for (i = 0; i < units.length; i++) {
            if (units[i] != "")
                validunits.push(units[i]);
        }
        validunits.sort();
        let headercontent = ' <select id="selectunit" onchange="changeReportUnit()">';
        for (i = 0; i < validunits.length; i++) {
            headercontent = headercontent + '<option value="' + validunits[i] + '">' + validunits[i] + '</option>';
        }
        headercontent = headercontent + '</select> ' + responsedata.FY;
        let contentHeadr = document.getElementsByClassName('report-header')[0];
        contentHeadr.innerHTML = headercontent;

        let unitdata = responsedata.data.filter(d => {
            return d.Unit == validunits[0];
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
    if (period == 'FY 21-22') {
        years = ['FY 2021-22', 'FY 2022-23'];
        tabheaders = ['Assessment FY 21-22 <br><span style="font-size:15px;"> (Year Completed)</span>', 'Planning FY 22-23 <br> <span style="font-size:15px;">(Year Ahead)<span>'];
        tabcontent.push(addAssessmentReport(data["FY 21-22"], '2021', '2022'));
        tabcontent.push(addPlanningReport(data["FY 22-23"], '2022', '2023'));
    }
    else if (period == 'FY 20-21') {
        years = ['FY 2020-21', 'FY 2021-22'];
        tabheaders = ['Assessment FY 20-21 <br><span style="font-size:15px;"> (Year Completed)</span>', 'Planning FY 21-22 <br> <span style="font-size:15px;">(Year Ahead)<span>'];
        tabcontent.push(addAssessmentReport(data["FY 20-21"], '2020', '2021'));
        tabcontent.push(addPlanningReport(data["FY 21-22"], '2021', '2022'));
    }
    else if (period == 'FY 19-20') {
        years = ['FY 2019-20', 'FY 2020-21'];
        tabheaders = ['Assessment FY 19-20 <br><span style="font-size:15px;"> (Year Completed)</span>', 'Planning FY 20-21 <br> <span style="font-size:15px;">(Year Ahead)<span>'];
        tabcontent.push(addAssessmentReport(data["FY 19-20"], '2019', '2020'));
        tabcontent.push(addPlanningReport(data["FY 20-21"], '2020', '2021'));
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
    if (reportdata == undefined)
        return content;
    content += '<p><b>Director\'s Name: </b>' + reportdata.firstName + ' ' + reportdata.lastName +
        '<br><b>Director\'s Email: </b>' + reportdata.email +
        '<br><b>Reporting Period: </b>July 1, ' + year1 + ' to June 30, ' + year2 +
        '<button type="button" style="float:right; background-color: #46166b; color:white ; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 2px; margin-right: 1px;text-align: center; margin: 0 auto;"onclick="printAssessmentReport(\'researchcenter\')">Print</button>';
    content += '<div id = "FY' + year1 + '">';

    let ids = getIds('FY' + year1);
    let data = {};
    data["mission"] = reportdata.mission;
    data["vision"] = reportdata.vision;
    content += addMissionAndVision(ids, data);

    ids = getIds('FY' + year1);
    data = {};
    data["annualBudget"] = reportdata.annualBudget;
    data["employeesState"] = checkNull(reportdata.stateHeadcount, true);
    data["employeesRF"] = checkNull(reportdata.rfHeadcount, true);
    data["fteState"] = checkNull(reportdata.stateNumber, true);
    data["fteRF"] = checkNull(reportdata.rfNumber, true);
    data["additionalAmount1"] = checkNull(reportdata.additionalAmount1, true);
    data["additionalSource1"] = checkNull(reportdata.additionalSource1);
    data["additionalAmount2"] = checkNull(reportdata.additionalAmount2, true);
    data["additionalSource2"] = checkNull(reportdata.additionalSource2);
    data["additionalAmount3"] = checkNull(reportdata.additionalAmount3, true);
    data["additionalSource3"] = checkNull(reportdata.additionalSource3);

    var amount1 = parseInt(data.additionalAmount1);
    var amount2 = parseInt(data.additionalAmount2);
    var amount3 = parseInt(data.additionalAmount3);

    addTotal3 = amount1 + amount2 + amount3;
    data["total"] = addTotal3;
    content += addResearchAnnualBudget(ids, data);

    ids = getIds('FY' + year1);
    data = {};
    data["federalApplicationsGoal"] = checkNull(reportdata.federalApplicationsGoal, true);
    data["federalApplicationsActual"] = checkNull(reportdata.federalApplicationsActual, true);
    data["stateApplicationsGoal"] = checkNull(reportdata.stateApplicationsGoal, true);
    data["stateApplicationsActual"] = checkNull(reportdata.stateApplicationsActual, true);
    data["privateApplicationsGoal"] = checkNull(reportdata.privateApplicationsGoal, true);
    data["privateApplicationsActual"] = checkNull(reportdata.privateApplicationsActual, true);

    var federalGoals = parseInt(data.federalApplicationsGoal);
    var federalActual = parseInt(data.federalApplicationsActual);
    var stateGoals = parseInt(data.stateApplicationsGoal);
    var stateActual = parseInt(data.stateApplicationsActual);
    var privateGoals = parseInt(data.privateApplicationsGoal);
    var privateActual = parseInt(data.privateApplicationsActual);


    var totalGoals = federalGoals + stateGoals + privateGoals;
    var totalActual = federalActual + stateActual + privateActual;

    data["proposal_total_goals"] = totalGoals;
    data["proposal_total_actual"] = totalActual;

    data["federalAwardsGoal"] = checkNull(reportdata.federalAwardsGoal, true);
    data["federalAwardsActual"] = checkNull(reportdata.federalAwardsActual, true);
    data["stateAwardsGoal"] = checkNull(reportdata.stateAwardsGoal, true);
    data["stateAwardsActual"] = checkNull(reportdata.stateAwardsActual, true);
    data["privateAwardsGoal"] = checkNull(reportdata.privateAwardsGoal, true);
    data["privateAwardsActual"] = checkNull(reportdata.privateAwardsActual, true);

    federalGoals = parseInt(data["federalAwardsGoal"], 10);
    federalActual = parseInt(data["federalAwardsActual"], 10);
    stateGoals = parseInt(data["stateAwardsGoal"], 10);
    stateActual = parseInt(data["stateAwardsActual"], 10);
    privateGoals = parseInt(data["privateAwardsGoal"], 10);
    privateActual = parseInt(data["privateAwardsActual"], 10);

    totalGoals = federalGoals + stateGoals + privateGoals;
    totalActual = federalActual + stateActual + privateActual;

    data["awards_goal_total"] = totalGoals;
    data["awards_actual_total"] = totalActual;

    data["lsProposalsGoal"] = checkNull(reportdata.lsProposalsGoal, true);
    data["lsProposalsActual"] = checkNull(reportdata.lsProposalsActual, true);
    data["lsAwardsGoal"] = checkNull(reportdata.lsAwardsGoal, true);
    data["lsAwardsActual"] = checkNull(reportdata.lsAwardsActual, true);

    data["sttrProposalsGoal"] = checkNull(reportdata.sttrProposalsGoal, true);
    data["sttrProposalsActual"] = checkNull(reportdata.sttrProposalsActual, true);
    data["sttrAwardssGoal"] = checkNull(reportdata.sttrAwardssGoal, true);
    data["sttrAwardsActual"] = checkNull(reportdata.sttrAwardsActual, true);

    content += addAppsProposalsAwards(ids, data, year1);
    //detailed research

    ids = getIds('FY' + year1);
    data = {};
    data["booksAuthoredGoal"] = checkNull(reportdata.booksAuthoredGoal, true);
    data["booksAuthoredActual"] = checkNull(reportdata.booksAuthoredActual, true);
    data["bookChaptersGoal"] = checkNull(reportdata.bookChaptersGoal, true);
    data["bookChaptersActual"] = checkNull(reportdata.bookChaptersActual, true);
    data["publicationsGoal"] = checkNull(reportdata.publicationsGoal, true);
    data["publicationsActual"] = checkNull(reportdata.publicationsActual, true);
    data["listOfPublications"] = checkNull(reportdata.listOfPublications, true);

    data["intellectualPropertiesGoal"] = checkNull(reportdata.intellectualPropertiesGoal, true);
    data["intellectualPropertiesActual"] = checkNull(reportdata.intellectualPropertiesActual, true);
    data["patentAppsGoal"] = checkNull(reportdata.patentAppsGoal, true);
    data["patentAppsActual"] = checkNull(reportdata.patentAppsActual, true);
    data["patentsIssuedGoal"] = checkNull(reportdata.patentsIssuedGoal, true);
    data["patentsIssuedActual"] = checkNull(reportdata.patentsIssuedActual, true);
    data["patentsLicenesedGoal"] = checkNull(reportdata.patentsLicenesedGoal, true);
    data["patentsLicenesedActual"] = checkNull(reportdata.patentsLicenesedActual, true);
    data["licensesExecutedGoal"] = checkNull(reportdata.licensesExecutedGoal, true);
    data["licensesExecutedActual"] = checkNull(reportdata.licensesExecutedActual, true);
    data["licensedRevenueGoal"] = checkNull(reportdata.licensedRevenueGoal, true);
    data["licensedRevenueActual"] = checkNull(reportdata.licensedRevenueActual, true);
    data["startupCompaniesGoal"] = checkNull(reportdata.startupCompaniesGoal, true);
    data["startupComapniesActual"] = checkNull(reportdata.startupComapniesActual, true);

    data["listofIntellectualProperties"] = checkNull(reportdata.listofIntellectualProperties);

    data["conferencesGoal"] = checkNull(reportdata.conferencesGoal, true);
    data["conferencesActual"] = checkNull(reportdata.conferencesActual, true);

    data["keynoteAddresses"] = checkNull(reportdata.keynoteAddresses);
    data["otherActivities"] = checkNull(reportdata.otherActivities);
    content += addResearchActivity(ids, data, year1);

    ids = getIds('FY' + year1);
    data = {};
    data["undergraduateStudentsGoal"] = checkNull(reportdata.undergraduateStudentsGoal, true);
    data["graduateStudentsGoal"] = checkNull(reportdata.graduateStudentsGoal, true);
    data["graduatePhdStudentsGoal"] = checkNull(reportdata.graduatePhdStudentsGoal, true);
    data["phdStudentsGoal"] = checkNull(reportdata.phdStudentsGoal, true);
    data["undergraduateStudentsActual"] = checkNull(reportdata.undergraduateStudentsActual, true);
    data["graduateStudentsActual"] = checkNull(reportdata.graduateStudentsActual, true);
    data["graduatePhdStudentsActual"] = checkNull(reportdata.graduatePhdStudentsActual, true);
    data["phdStudentsActual"] = checkNull(reportdata.phdStudentsActual, true);
    data["natureOfMentoringUndergradudate"] = checkNull(reportdata.natureOfMentoringUndergradudate);
    data["natureOfMentoringGraduate"] = checkNull(reportdata.natureOfMentoringGraduate);
    data["natureOfMentoringGraduatePhd"] = checkNull(reportdata.natureOfMentoringGraduatePhd);
    data["natureOfMentoringPhd"] = checkNull(reportdata.natureOfMentoringPhd);
    content += addEducation(ids, data);

    for (var i = 1; i < 6; i++) {                                                  //Need Check
        ids = getIds('FY' + year1);
        let goal = new Goal(i, reportdata["goal" + i], reportdata["actions" + i],
            reportdata["metrics" + i], reportdata["timeframe" + i], reportdata["actionsImplemented" + i],
            reportdata["noteworthyResults" + i], reportdata["changes" + i]);
        content += addSmartGoal(ids, goal, year1);
    }

    ids = getIds('FY' + year1);                                                     //Need Check
    data = [];
    if (reportdata.topAchievements1 != '')
        data.push(reportdata.topAchievements1);
    else
        data.push("N/A");
    if (reportdata.topAchievements2 != '')
        data.push(reportdata.topAchievements2);
    else
        data.push("N/A");
    if (reportdata.topAchievements3 != '')
        data.push(reportdata.topAchievements3);
    else
        data.push("N/A");
    if (reportdata.topAchievements4 != '')
        data.push(reportdata.topAchievements4);
    else
        data.push("N/A");
    if (reportdata.topAchievements5 != '')
        data.push(reportdata.topAchievements5);
    else
        data.push("N/A");

    content += addTopAchievements(ids, data);

    ids = getIds('FY' + year1);
    if (reportdata.hasOwnProperty("otherAchievements"))
        content += addOtherAchievements(ids, reportdata.otherAchievements);

    ids = getIds('FY' + year1);
    data = {};
    data["noofpartners"] = reportdata.noofpartners;
    if (reportdata.hasOwnProperty("partners"))
        data["partners"] = reportdata.partners;
    content += addPartners(ids, data);

    ids = getIds('FY' + year1);
    data = {};
    data["opportunities"] = reportdata.otherThoughtsToGrowResearch;
    data["challenges"] = reportdata.bigChallenges;
    data["needs"] = reportdata.resourceNeeds;
    data["strategies"] = reportdata.strategicSuggestions;
    data["suggestions"] = reportdata.otherthoughts;
    content += addOtherThoughts(ids, data);
    content += '</div>'
    return content;
}

let addPlanningReport = function (reportdata, year1, year2) {

    let content = '';

    if (typeof reportdata === "undefined") {
        content = 'There is no planning data';
    }
    else {

        content += '<p><b>Director\'s Name: </b>' + reportdata.firstName + ' ' + reportdata.lastName +
            '<br><b>Director\'s Email: </b>' + reportdata.email +
            '<br><b>Reporting Period: </b>July 1, ' + year1 + ' to June 30, ' + year2 +
            '<button type="button" style="float:right; background-color: #46166b; color:white ; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 2px; margin-right: 1px;text-align: center; margin: 0 auto;"onclick="printPlanningReport(\'researchcenter\')">Print</button>';
        content += '<div id = "FY' + year1 + '">';

        let ids = getIds('FY' + year1);
        let data = {};
        data["mission"] = reportdata.mission;
        data["vision"] = reportdata.vision;
        content += addMissionAndVision(ids, data);

        ids = getIds('FY' + year1);
        data = {};
        data["annualBudget"] = reportdata.annualBudget;
        data["employeesState"] = checkNull(reportdata.stateHeadcount);
        data["employeesRF"] = checkNull(reportdata.rfHeadcount);
        data["fteState"] = checkNull(reportdata.stateNumber);
        data["fteRF"] = checkNull(reportdata.rfNumber);
        content += addAnnualBudget(ids, data);

        ids = getIds('FY' + year1);
        data = {};
        //data["proposals"] = reportdata.Q51;                               //Need Check
        data["federalApplication"] = checkNull(reportdata.proposals1);
        data["stateApplication"] = checkNull(reportdata.proposals2);
        data["privateApplication"] = checkNull(reportdata.proposals3);
        if (data["federalApplication"] == "N/A" || data["stateApplication"] == "N/A" || data["privateApplication"] == "N/A") {
            if (data["federalApplication"] == "N/A" && data["stateApplication"] == "N/A" && data["privateApplication"] == "N/A") {
                addData5 = "N/A";
            }
            else if (data["federalApplication"] == "N/A" && data["stateApplication"] == "N/A") {
                var privateApplication = parseInt(data.privateApplication);
                addData5 = privateApplication;
            }
            else if (data["federalApplication"] == "N/A" && data["privateApplication"] == "N/A") {
                var stateApplication = parseInt(data.stateApplication);
                addData5 = stateApplication;
            }
            else if (data["stateApplication"] == "N/A" && data["privateApplication"] == "N/A") {
                var federalApplication = parseInt(data.federalApplication);
                addData5 = federalApplication;
            }
            else if (data["federalApplication"] == "N/A") {
                var stateApplication = parseInt(data.stateApplication);
                var privateApplication = parseInt(data.privateApplication);

                addData5 = stateApplication + privateApplication;
            }
            else if (data["stateApplication"] == "N/A") {
                var federalApplication = parseInt(data.federalApplication);
                var privateApplication = parseInt(data.privateApplication);

                addData5 = federalApplication + privateApplication;
            }
            else if (data["privateApplication"] == "N/A") {
                var stateApplication = parseInt(data.stateApplication);
                var federalApplication = parseInt(data.federalApplication);

                addData5 = stateApplication + federalApplication;
            }
        }
        else {
            var federalApplication = parseInt(data.federalApplication);
            var stateApplication = parseInt(data.stateApplication);
            var privateApplication = parseInt(data.privateApplication);

            addData5 = federalApplication + stateApplication + privateApplication;
        }

        data["proposal_total"] = addData5;
        //data["awards"] = reportdata.Q52;                                  //Need Check
        data["federalAwards"] = checkNull(reportdata.awards1);
        data["stateAwards"] = checkNull(reportdata.awards2);
        data["privateAwards"] = checkNull(reportdata.awards3);

        if (data["federalAwards"] == "N/A" || data["stateAwards"] == "N/A" || data["privateAwards"] == "N/A") {
            if (data["federalAwards"] == "N/A" && data["stateAwards"] == "N/A" && data["privateAwards"] == "N/A") {
                addData6 = "N/A";
            }
            else if (data["federalAwards"] == "N/A" && data["stateAwards"] == "N/A") {
                var privateAwards = parseInt(data.privateAwards);
                addData6 = privateAwards;
            }
            else if (data["federalAwards"] == "N/A" && data["privateAwards"] == "N/A") {
                var stateAwards = parseInt(data.stateAwards);
                addData6 = stateAwards;
            }
            else if (data["stateAwards"] == "N/A" && data["privateAwards"] == "N/A") {
                var federalAwards = parseInt(data.federalAwards);
                addData6 = federalAwards;
            }
            else if (data["federalAwards"] == "N/A") {
                var stateAwards = parseInt(data.stateAwards);
                var privateAwards = parseInt(data.privateAwards);

                addData6 = stateAwards + privateAwards;
            }
            else if (data["stateAwards"] == "N/A") {
                var federalAwards = parseInt(data.federalAwards);
                var privateAwards = parseInt(data.privateAwards);

                addData6 = federalAwards + privateAwards;
            }
            else if (data["privateAwards"] == "N/A") {
                var stateAwards = parseInt(data.stateAwards);
                var federalAwards = parseInt(data.federalAwards);

                addData6 = stateAwards + federalAwards;
            }
        }
        else {
            var federalAwards = parseInt(data.federalAwards);
            var stateAwards = parseInt(data.stateAwards);
            var privateAwards = parseInt(data.privateAwards);

            addData6 = federalAwards + stateAwards + privateAwards;
        }

        data["awrds_total"] = addData6;
        //data["largeScale"] = checkNull(reportdata.Q53);                   //Need Check
        data["proposal"] = checkNull(reportdata.largeScale1);
        data["lsAwards"] = checkNull(reportdata.largeScale2);

        //data["strr"] = checkNull(reportdata.Q54);                         //Need Check
        data["stProposal"] = checkNull(reportdata.sttrAwards1);
        data["stAwards"] = checkNull(reportdata.sttrAwards2);

        //data["publications"] = checkNull(reportdata.Q55);                 //Need Check
        data["booksAuthored"] = checkNull(reportdata.publication1);
        data["booksChapters"] = checkNull(reportdata.publication2);
        data["publicationsTable"] = checkNull(reportdata.publication3);


        //data["technologyTransfer"] = checkNull(reportdata.Q56);           //Need Check
        data["intellectual"] = checkNull(reportdata.technologyTransfer1);
        data["patentsApplications"] = checkNull(reportdata.technologyTransfer2);
        data["patentsIssued"] = checkNull(reportdata.technologyTransfer3);
        data["patentsLicensed"] = checkNull(reportdata.technologyTransfer4);
        data["licensedExecuted"] = checkNull(reportdata.technologyTransfer5);
        data["licensedRevenue"] = checkNull(reportdata.technologyTransfer6);
        data["startupCompanies"] = checkNull(reportdata.technologyTransfer7);

        //data["conference"] = checkNull(reportdata.Q57);                   //Need Check
        data["goals"] = checkNull(reportdata.conference);

        //data["education"] = checkNull(reportdata.Q58);                    //Need Check
        data["undergraduate"] = checkNull(reportdata.educationAndTraining1);
        data["graduate_masters"] = checkNull(reportdata.educationAndTraining2);
        data["graduate_phd"] = checkNull(reportdata.educationAndTraining3);
        data["post"] = checkNull(reportdata.educationAndTraining4);
        content += addResearchPerformancetarget(ids, data, year1);


        for (var i = 1; i < 6; i++) {
            ids = getIds('FY' + year1);
            let goal = new GoalPlan(i, reportdata["goal" + i], reportdata["actions" + i],
                reportdata["metrics" + i], reportdata["timeframe" + i], reportdata["primaryLeader" + i],
                reportdata["impactWorkplan" + i], reportdata["collaboratingUnits" + i],
                reportdata["impactResearchExcellence" + i]);
            content += addSmartGoalPlan(ids, goal, year1);
        }


        // for (var i = 7; i < 12; i++) {
        //     ids = getIds('FY' + year1);
        //     let goal = new GoalPlan(i - 6, reportdata["Q" + i + "1"], reportdata["Q" + i + "2"],
        //         reportdata["Q" + i + "3"], reportdata["Q" + i + "4"], reportdata["Q" + i + "5"],
        //         reportdata["Q" + i + "6"], reportdata["Q" + i + "7"], reportdata["Q" + i + "8"]);
        //     content += addSmartGoalPlan(ids, goal, year1);
        // }
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
        '<tr><th class="border_right padding_bottom padding_top">State Applications</th><td>' +
        data.stateApplication + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Private Applications</th><td>' +
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
    // let employeesStateTwoDecimal = Math.round(data.employeesState * 100 + Number.EPSILON) / 100;
    let budgetContent = '<h4> ANNUAL BUDGET </h4>' +
        '<div class="annual-budget">' +
        '<h4> Number of State and RF Employees/FTEs.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td><th class="border_bottom" width="36.5%">State</th><th class="border_bottom" width="36.5%">RF</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">#Employees (Headcounts)</th><td>' + data.employeesState + '</td><td>' +
        data.employeesRF + '</td></tr>' + '<tr><th class="border_right">#FTEs</th><td>' + data.fteState + '</td><td>' +
        data.fteRF + '</td></tr></tbody></table></div>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Annual Budget", budgetContent);
}


let addResearchAnnualBudget = function (ids, data) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    let totalBudget = formatter.format(data["total"]);
    let currencyFormat1 = formatter.format(data.additionalAmount1);
    let currencyFormat2 = formatter.format(data.additionalAmount2);
    let currencyFormat3 = formatter.format(data.additionalAmount3);


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
        '<th class="border_right padding_bottom padding_top">Name of Additional Source 1 </th><td>' + data.additionalSource1 + '</td><td>' +
        currencyFormat1 + '</td></tr>' +
        '<tr><th class="border_right">Name of Additional Source 2</th><td>' + data.additionalSource2 + '</td><td>' +
        currencyFormat2 + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Name of Additional Source 3 </th><td>' + data.additionalSource3 + '</td><td>' +
        currencyFormat3 + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Total </th><td>' + " " + '</td><td>' +
        totalBudget + '</td></tr>' +
        '</tbody></table></div>';

    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Financial Summary Budget", financialbudgetContent);
}


let addAppsProposalsAwards = function (ids, data, year) {
    let period = getPeriod(year);
    let detailedActivity = '<h4> PROPOSALS</h4>' +
        '<div class="annual-budget">' +
        '<h4> Number of Research Proposals Submitted to Extramural Sponsors</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Federal Applications</th><td>' + data.federalApplicationsGoal + '</td><td>' +
        data.federalApplicationsActual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top ">State Applications</th><td>' + data.stateApplicationsGoal + '</td><td>' +
        data.stateApplicationsActual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top ">Private/Other Sponsors Applications</th><td>' + data.privateApplicationsGoal + '</td><td>' +
        data.privateApplicationsActual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top">Total</th><td>' + data.proposal_total_goals + '</td><td>' +
        data.proposal_total_actual + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +

        '<h4> AWARDS</h4>' +
        '<div class="annual-budget">' +
        '<h4> Numbers of Awards Received from Extramural Sponsors  </h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Federals Awards </th><td>' + data.federalAwardsGoal + '</td><td>' +
        data.federalAwardsActual + '</td></tr>' +
        '<tr><th class="border_right">State Awards </th><td>' + data.stateAwardsGoal + '</td><td>' +
        data.stateAwardsActual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Private Awards </th><td>' + data.privateAwardsGoal + '</td><td>' +
        data.privateAwardsActual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Total </th><td>' + data.awards_goal_total + '</td><td>' +
        data.awards_actual_total + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +

        '<h4> LARGE SCALE PROPOSALS/AWARDS</h4>' +
        '<div class="annual-budget">' +
        '<h4> Number of Large Scale Proposals/Awards </h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">#Proposals </th><td>' + data.lsProposalsGoal + '</td><td>' +
        data.lsProposalsActual + '</td></tr>' +
        '<tr><th class="border_right">#Awards </th><td>' + data.lsAwardsGoal + '</td><td>' +
        data.lsAwardsActual + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +

        '<h4>STTR/SBIR PROPOSALS/AWARDS</h4>' +
        '<div class="annual-budget">' +
        '<h4>Numbers of STTR/SBIR Proposals/Awards</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">#Proposals </th><td>' + data.sttrProposalsGoal + '</td><td>' +
        data.sttrProposalsActual + '</td></tr>' +
        '<tr><th class="border_right">#Awards </th><td>' + data.sttrAwardssGoal + '</td><td>' +
        data.sttrAwardsActual + '</td></tr>' +
        '</tbody></table></div>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Detailed Activity Report Proposal and Awards", detailedActivity);
}


let addResearchActivity = function (ids, data, year) {

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    let period = getPeriod(year);
    let researchActivity = '<h4> PUBLICATIONS </h4>' +
        '<div class="annual-budget">' +
        '<h4>Number of Publications by Center/Institute/Lab in the past FY</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Books Authored/Edited </th><td>' + data.booksAuthoredGoal + '</td><td>' +
        data.booksAuthoredActual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top">Books Chapters Authored/Edited  </th><td>' + data.bookChaptersGoal + '</td><td>' +
        data.bookChaptersActual + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top ">Publications</th><td>' + data.publicationsGoal + '</td><td>' +
        data.publicationsActual + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +

        '<h4>List of Publications by Center/Institute/Lab in the past FY</h4>' +
        '<div class="annual-budget">' + formatPara(data.listOfPublications) +
        '</div>' +
        '</br>' +
        '</br>' +

        '<h4> TECHNOLOGY TRANSFER/COMMERCIALIZATION </h4>' +
        '<div class="annual-budget">' +
        '<h4>Number of Intellectual Property/Technology Transfer/Commercialization in the Past FY </h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Intellectual Property Disclosures </th><td>' + data.intellectualPropertiesGoal + '</td><td>' +
        data.intellectualPropertiesActual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top">Patents Applications </th><td>' + data.patentAppsGoal + '</td><td>' +
        data.patentAppsActual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Patents Issued  </th><td>' + data.patentsIssuedGoal + '</td><td>' +
        data.patentsIssuedActual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Patents Licensed </th><td>' + data.patentsLicenesedGoal + '</td><td>' +
        data.patentsLicenesedActual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">License Executed </th><td>' + data.licensesExecutedGoal + '</td><td>' +
        data.licensesExecutedActual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">License Revenue </th><td>' + (isNaN(data.licensedRevenueGoal) ? data.licensedRevenueGoal : formatter.format(data.licensedRevenueGoal)) + '</td><td>' +
        (isNaN(data.licensedRevenueActual) ? data.licensedRevenueActual : formatter.format(data.licensedRevenueActual)) + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Start-up Companies </th><td>' + data.startupCompaniesGoal + '</td><td>' +
        data.startupComapniesActual + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +

        '<h4>List of Intellectual Property/Technology Transfer/Commercialization in the Past FY </h4>' +
        '<div class="annual-budget"><p>' + formatPara(data.listofIntellectualProperties) + '</p>' +
        '</div>' +
        '<br/>' +
        '<br/>' +

        '<h4> CONFERENCE/SEMINAR PRESENTATIONS</h4>' +
        '<div class="annual-budget">' +
        '<h4> Numbers of all Keynote Address or Plenary Invited Presentations</h4>' +
        '<table width="100%">' +
        '<tbody><tr>' +
        '<th class="padding_bottom padding_top">Your Goals for FY ' + period + ' </th><td>' + data.conferencesGoal + '</td></tr>' +
        '<tr><th class="">Actual Numbers </th><td>' + data.conferencesActual + '</td>' +
        '</tbody></table></div>' +
        '<br/>' +
        '<br/>' +

        '<h4> List of all Keynote Address or Plenary Invited Presentations </h4>' +
        '<div class="annual-budget"><p>' + formatPara(data.keynoteAddresses) + '</p>' +
        '</div>' +
        '<br/>' +
        '<br/>' +

        '<h4> OTHER ACTIVITIES</h4>' +
        '<h4>List of Scholarly Activity:</h4>' +
        '<div class="annual-budget"><p>' + formatPara(data.otherActivities) + '</p>' +
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
        '<tbody><tr><th class="border_right padding_bottom padding_top">#Students - Your Goal for FY ' + period + '</th><td>' + data.undergraduateStudentsGoal + '</td>' +
        '<td>' + data.graduateStudentsGoal + '</td> ' +
        '<td>' + data.graduatePhdStudentsGoal + '</td> ' +
        '<td>' + data.phdStudentsGoal + '</td> ' +
        '</tr>' +
        '<tr><th class="border_right padding_bottom padding_top">#Students - Actual Numbers</th><td>' + data.undergraduateStudentsActual + '</td>' +
        '<td>' + data.graduateStudentsActual + '</td> ' +
        '<td>' + data.graduatePhdStudentsActual + '</td> ' +
        '<td>' + data.phdStudentsActual + '</td> ' +
        '</tr>' +
        '<tr><th class="border_right padding_bottom padding_top"> Nature of Mentoring</th><td>' + data.natureOfMentoringUndergradudate + '</td>' +
        '<td>' + data.natureOfMentoringGraduate + '</td> ' +
        '<td>' + data.natureOfMentoringGraduatePhd + '</td> ' +
        '<td>' + data.natureOfMentoringPhd + '</td> ' +
        '</tr>' +
        '</tbody></table></div>';
    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Education And Training", eduContent);
}


let addPartners = function (ids, data) {
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
            if (element.hasOwnProperty("Organization") && element["Organization"] != '')
                content += 'Organization : ' + element["Organization"] + '<br/>';
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
        smartgoal += "<p><b>Actions Implemented: </b>" + (goal.actionsImplemented == '' ? 'N/A' : formatText(goal.actionsImplemented)) + '</p>';
        smartgoal += "<p><b>Noteworthy Results: </b>" + (goal.results == '' ? 'N/A' : formatText(goal.results)) + '</p>';
        smartgoal += '<p><b>Changes Made/Planned: </b>' + (goal.changes == '' ? 'N/A' : formatText(goal.changes)) + '</p></div>';
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

let addOtherAchievements = function (ids, achievements) {
    let content = '<div class="achievements">';
    for (var i = 0; i < achievements.length; i++) {
        content += '<p><b>Achievement ' + (i + 1) + ': </b><p>';
        content += formatText(achievements[i].Achievement);
    }
    content += "</div>";

    return generateAccordionElem(1, ids.collapseId, ids.headerId, ids.parentId, ids.childId, "Other Achievements", content);
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