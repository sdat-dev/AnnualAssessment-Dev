let dataURL = "data/researchcenterreports-FY 20-21.json";
//getting content Element to append grants information
window.onload = function () {
    let request = axios.get(dataURL);
    axios.all([request]).then(axios.spread((...responses) => {
        let responsedata = responses[0].data;
        localStorage.clear();
        localStorage.setItem("data", JSON.stringify(responsedata));
        
        let units = getDistinctAttributes(responsedata.data, "Unit");
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
    if (period == 'FY 20-21') {
        years = ['FY 2020-21', 'FY 2021-22'];
        tabheaders = ['Assessment FY21 <br><span style="font-size:15px;"> (Year Completed)</span>', 'Planning FY22 <br> <span style="font-size:15px;">(Year Ahead)<span>'];
        tabcontent.push(addAssessmentReport(data["FY 20-21"], '2020', '2021'));
        tabcontent.push(addPlanningReport(data["FY 21-22"], '2021', '2022'));
    }
    else if (period == 'FY 19-20') {
        years = ['FY 2019-20', 'FY 2020-21'];
        tabheaders = ['Assessment FY20 <br><span style="font-size:15px;"> (Year Completed)</span>', 'Planning FY21 <br> <span style="font-size:15px;">(Year Ahead)<span>'];
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
    if(reportdata == undefined)
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
    data["employeesState"] = checkNull(reportdata.stateHeadcount);
    data["employeesRF"] = checkNull(reportdata.rfHeadcount);
    data["fteState"] = checkNull(reportdata.stateNumber);
    data["fteRF"] = checkNull(reportdata.rfNumber);
    data["nameOfadditionalsource1"] = checkNull(reportdata.otherRevenue1);
    data["nameOfadditionalsource11"] = checkNull(reportdata.otherRevenue2);

    data["nameOfadditionalsource2"] = checkNull(reportdata.otherRevenue3);
    data["nameOfadditionalsource21"] = checkNull(reportdata.otherRevenue4);

    data["nameOfadditionalsource3"] = checkNull(reportdata.otherRevenue5);
    data["nameOfadditionalsource31"] = checkNull(reportdata.otherRevenue6);

    addTotal3 = { 1: data["nameOfadditionalsource1"], 2: data["nameOfadditionalsource2"], 3: data["nameOfadditionalsource3"] };
    data["total3"] = add(addTotal3);                         //Need Check
    data["total33"] = add(addTotal3);                        //Need Check
    content += addResearceAnnualBudget(ids, data);

    ids = getIds('FY' + year1);
    data = {};
    addData = {};
    //data["proposals"] = reportdata.Q51;                                     //Need Check
    data["federalApplicationgoals"] = checkNull(reportdata.porposals1);
    data["federalApplicationactual"] = checkNull(reportdata.porposals4);
    data["stateApplicationgoals"] = checkNull(reportdata.porposals3);
    data["stateApplicationactual"] = checkNull(reportdata.porposals6);
    data["privateApplicationgoals"] = checkNull(reportdata.porposals2);
    data["privateApplicationactual"] = checkNull(reportdata.porposals5);

    addData = { 1: data["federalApplicationgoals"], 2: data["stateApplicationgoals"], 3: data["privateApplicationgoals"] };
    addData1 = { 1: data["federalApplicationactual"], 2: data["stateApplicationactual"], 3: data["stateApplicationactual"] };

    data["proposal_total_goals"] = add(addData);
    data["proposal_total_actual"] = add(addData1);

    //data["awards"] = reportdata.Q52;                                        //Need Check
    data["federalAwardsgoals"] = checkNull(reportdata.awards1);
    data["federalAwardsactual"] = checkNull(reportdata.awards4);

    data["stateAwardsgoals"] = checkNull(reportdata.awards3);
    data["stateAwardsactual"] = checkNull(reportdata.awards6);

    data["privateAwardsgoals"] = checkNull(reportdata.awards2);
    data["privateAwardsactual"] = checkNull(reportdata.awards5);

    addData2 = { 1: data["federalAwardsgoals"], 2: data["stateAwardsgoals"], 3: data["privateAwardsgoals"] };
    addData3 = { 1: data["federalAwardsactual"], 2: data["stateAwardsactual"], 3: data["privateAwardsactual"] };


    data["awrds_total_goals"] = add(addData2);
    data["awrds_total_actual"] = add(addData3);

    //data["largeScale"] = checkNull(reportdata.Q53);                         //Need Check
    data["proposal_goals"] = checkNull(reportdata.largeScale1);
    data["proposal_actual"] = checkNull(reportdata.largeScale2);
    data["lsAwards_goals"] = checkNull(reportdata.largeScale3);
    data["lsAwards_actual"] = checkNull(reportdata.largeScale4);

    //data["strr"] = checkNull(reportdata.Q54);                               //Need Check

    data["stProposal_goals"] = checkNull(reportdata.sttrAwards1);
    data["stProposal_actual"] = checkNull(reportdata.sttrAwards2);

    data["stAwards_goals"] = checkNull(reportdata.sttrAwards3);
    data["stAwards_actual"] = checkNull(reportdata.sttrAwards4);

    content += adddetailedActivity(ids, data, year1);
    //detailed research

    ids = getIds('FY' + year1);
    data = {};
    //data["publications"] = checkNull(reportdata.Q61);                       //Need Check
    data["booksAuthoredgoals"] = checkNull(reportdata.publications1);
    data["bookauthoredsactual"] = checkNull(reportdata.publications2);

    data["bookschaptersgoals"] = checkNull(reportdata.publications3);
    data["bookschapteractual"] = checkNull(reportdata.publications4);


    data["publicationsgoals"] = checkNull(reportdata.publications5);
    data["publicationsactual"] = checkNull(reportdata.publications6);


    data["listofpublications"] = checkNull(reportdata.listOfCenter);

    data["intellectualgoals"] = checkNull(reportdata.technologyTransfer1);
    data["intellectualactual"] = checkNull(reportdata.technologyTransfer2);

    data["patentsgoals"] = checkNull(reportdata.technologyTransfer3);
    data["patentsactual"] = checkNull(reportdata.technologyTransfer4);
    data["patlicenesedlgoals"] = checkNull(reportdata.technologyTransfer5);
    data["patlicensedactual"] = checkNull(reportdata.technologyTransfer6);


    data["patlicgoals"] = checkNull(reportdata.technologyTransfer7);
    data["patlicactuals"] = checkNull(reportdata.technologyTransfer8);

    data["licensedexecutedgoals"] = checkNull(reportdata.technologyTransfer9);
    data["licensedexecutedactual"] = checkNull(reportdata.technologyTransfer10);

    data["licensedrevenuegoals"] = checkNull(reportdata.technologyTransfer11);
    data["licensedrevenueactual"] = checkNull(reportdata.technologyTransfer12);

    data["startupcompaniesgoals"] = checkNull(reportdata.technologyTransfer13);
    data["starupcomapnieseactual"] = checkNull(reportdata.technologyTransfer14);

    data["listofintelletual"] = checkNull(reportdata.propertyDisclosures);

    data["yougoaloffy19020"] = checkNull(reportdata.conference1);
    data["actualnumbers"] = checkNull(reportdata.conference2);

    data["listofkeynote"] = checkNull(reportdata.keynoteAddresses);

    data["otheractivities"] = checkNull(reportdata.otherActivities);

    content += addresearchActivity(ids, data, year1);
    //****** */

    ids = getIds('FY' + year1);
    data = {};
    //data["educationandtraining"] = checkNull(reportdata.Q71);                       //Needs Check
    data["students_goals_undergraduate"] = checkNull(reportdata.educationAndTraining1);
    data["students_goals_graduate"] = checkNull(reportdata.educationAndTraining2);
    data["students_goals_graduate_phd"] = checkNull(reportdata.educationAndTraining3);
    data["students_goals_phd"] = checkNull(reportdata.educationAndTraining4);

    data["students_actual_undergraduate"] = checkNull(reportdata.educationAndTraining5);
    data["students_actual_graduate"] = checkNull(reportdata.educationAndTraining6);
    data["students_actual_graduate_phd"] = checkNull(reportdata.educationAndTraining7);
    data["students_actual_phd"] = checkNull(reportdata.educationAndTraining8);

    data["nature_of_mentoring_undergradudate"] = checkNull(reportdata.educationAndTraining9);
    data["nature_of_mentoring_graduate"] = checkNull(reportdata.educationAndTraining10);
    data["nature_of_mentoring_graduate_phd"] = checkNull(reportdata.educationAndTraining11);
    data["nature_of_mentoringl_phd"] = checkNull(reportdata.educationAndTraining12);
    content += addEducation(ids, data);


    for (var i = 1; i < 6; i++) {                                                  //Need Check
        ids = getIds('FY' + year1);
        let goal = new Goal(i , reportdata["goal" + i], reportdata["actions" + i],
            reportdata["metrics" + i], reportdata["timeframe" + i], reportdata["actionsImplemented" + i],
            reportdata["noteworthyResults" + i], reportdata["changes" + i]);
        content += addSmartGoal(ids, goal, year1);
    }



    // for (var i = 9; i < 14; i++) {
    //     ids = getIds('FY' + year1);
    //     let goal = new Goal(i - 8, reportdata["Q" + i + "1"], reportdata["Q" + i + "2"],
    //         reportdata["Q" + i + "3"], reportdata["Q" + i + "4"], reportdata["Q" + i + "5"],
    //         reportdata["Q" + i + "6"], reportdata["Q" + i + "7"]);
    //     content += addSmartGoal(ids, goal, year1);
    // }

    ids = getIds('FY' + year1);                                                     //Need Check
    data = [];
    if (ids.parentId == "FY2019") {
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
    }
    else {
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
    }

    content += addTopAchievements(ids, data);

    ids = getIds('FY' + year1);
    data = {};
    data["noofpartners"] = reportdata.partnersAffiliates;
    if (reportdata.hasOwnProperty("partners"))
        data["partners"] = reportdata.partners;

    content += addList_partners(ids, data);

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

        addData5 = { 1: data["federalApplication"], 2: data["stateApplication"], 3: data["privateApplication"] };

        data["proposal_total"] = add(addData5);
        //data["awards"] = reportdata.Q52;                                  //Need Check
        data["federalAwards"] = checkNull(reportdata.awards1);
        data["stateAwards"] = checkNull(reportdata.awards2);
        data["privateAwards"] = checkNull(reportdata.awards3);

        addData6 = { 1: data["federalAwards"], 2: data["stateAwards"], 3: data["privateAwards"] };

        data["awrds_total"] = add(addData6);

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