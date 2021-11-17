
function printAdminAssessment(reportdata, year1, year2) {
    let data = {};
    data["unit"] = reportdata["unit"];

    data["mission"] = reportdata.mission;
    data["vision"] = reportdata.vision;

    data["annualBudget"] = reportdata.annualBudget;
    data["employeesState"] = checkNull(reportdata.stateHeadcount, true);
    data["employeesRF"] = checkNull(reportdata.rfHeadcount, true);
    data["fteState"] = checkNull(reportdata.stateNumber, true);
    data["fteRF"] = checkNull(reportdata.rfNumber, true);
    let content = '';
    content = '<h1 style="text-align: center;">' + data.unit + '</h1><div style="margin-botton:30px;"></div><h1 style="text-align: center;">Annual Assessment Report (' + year1 + '-' + year2 + ')</h1>' +
        '<div style="margin-botton:30px;"></div><h3 style="text-align: center;">Director: ' + reportdata.firstName + ' ' + reportdata.lastName + '</h3>' +
        '<h4>MISSION</h4>' +
        '<p class="mission">' + data.mission + '</p>' +
        '<h4>VISION</h4>' +
        '<p class="vision">' + data.vision + '</p>' +

        '<h4> ANNUAL BUDGET </h4>' +
        '<div class="annual-budget"><p>' + data.annualBudget + '</p>' +
        '<h4> Indicate below, the number of State and RF Employees/FTEs.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td><th class="border_bottom" width="36.5%">State</th><th class="border_bottom" width="36.5%">RF</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">#Employees (Headcounts)</th><td style=" text-align: center;">' + data.employeesState + '</td><td style=" text-align: center;">' +
        data.employeesRF + '</td></tr>' + '<tr><th class="border_right">#FTEs</th><td style=" text-align: center;">' + data.fteState + '</td><td style=" text-align: center;">' +
        data.fteRF + '</td></tr></tbody></table></div><br>';

    data = {};
    for (var i = 1; i < 7; i++) {
        data['membership' + i] = reportdata["organization" + i];
        data['benefit' + i] = reportdata["membershipBenefit" + i];
    }
    content += printOrganizationalMemberships(data);

    for (var i = 1; i <= 5; i++) {

        let no = i;
        let goal = new Goal(no, reportdata["goal" + i], reportdata["actions" + i],
            reportdata["metrics" + i], reportdata["timeframe" + i], reportdata["actionsImplemented" + i], reportdata["noteworthyResults" + i], reportdata["changes" + i]);
        content += printSmartGoal(goal, year1);
    }

    data = [];
    if (reportdata.topAchievements1 != 'false' && reportdata.noteworthyResults1 != '')
        data.push(reportdata.noteworthyResults1);
    if (reportdata.topAchievements2 != 'false' && reportdata.noteworthyResults2 != '')
        data.push(reportdata.noteworthyResults2);
    if (reportdata.topAchievements3 != 'false' && reportdata.noteworthyResults3 != '')
        data.push(reportdata.noteworthyResults3);
    if (reportdata.topAchievements4 != 'false' && reportdata.noteworthyResults4 != '')
        data.push(reportdata.noteworthyResults4);
    if (reportdata.topAchievements5 != 'false' && reportdata.noteworthyResults5 != '')
        data.push(reportdata.noteworthyResults5);
    if (reportdata.achievement1 != '')
        data.push(reportdata.achievement1);
    if (reportdata.achievement2 != '')
        data.push(reportdata.achievement2);
    if (reportdata.achievement3 != '')
        data.push(reportdata.achievement3);
    if (reportdata.achievement4 != '')
        data.push(reportdata.achievement4);
    if (reportdata.achievement5 != '')
        data.push(reportdata.achievement5);
    content += printTopAchievements(data);

    if (reportdata.hasOwnProperty("otherAchievements"))
        content += printOtherAchievements(reportdata)

    data = {};
    data["opportunities"] = reportdata.bigOpportunities;
    data["challenges"] = reportdata.bigChallenges;
    data["needs"] = reportdata.resourceNeeds;
    data["strategies"] = reportdata.strategicSuggestions;
    data["suggestions"] = reportdata.otherthoughts;
    content += printOtherThoughts(data);

    return content;
}


function printAdminPlanning(reportdata, year1, year2) {
    let data = {};
    data["unit"] = reportdata.unit
    let content = '';
    data["mission"] = reportdata.mission;
    data["vision"] = reportdata.vision;
    data["annualBudget"] = reportdata.annualBudget;
    data["employeesState"] = reportdata.stateHeadcount;
    data["employeesRF"] = reportdata.rfHeadcount;
    data["fteState"] = reportdata.stateNumber;
    data["fteRF"] = reportdata.rfNumber;


    content = '<h1 style="text-align: center;">' + data.unit + '</h1><div style="margin-botton:30px;"></div><h1 style="text-align: center;">Planning Report (' + year1 + '-' + year2 + ')</h1>' +
        '<div style="margin-botton:30px;"></div><h3 style="text-align: center;">Director: ' + reportdata.firstName + ' ' + reportdata.lastName + '</h3>' +
        '<h4>MISSION</h4>' +
        '<p class="mission">' + data.mission + '</p>' +
        '<h4>VISION</h4>' +
        '<p class="vision">' + data.vision + '</p>' +

        '<h4> ANNUAL BUDGET </h4>' +
        '<div class="annual-budget"><p>' + data.annualBudget + '</p>' +
        '<h4> Indicate below, the number of State and RF Employees/FTEs.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td><th class="border_bottom" width="36.5%">State</th><th class="border_bottom" width="36.5%">RF</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">#Employees (Headcounts)</th><td style=" text-align: center;">' + data.employeesState + '</td><td style=" text-align: center;">' +
        data.employeesRF + '</td></tr>' + '<tr><th class="border_right">#FTEs</th><td style=" text-align: center;">' + data.fteState + '</td><td style=" text-align: center;">' +
        data.fteRF + '</td></tr></tbody></table></div>';

    content += goalPlanningDetailsAdmin(reportdata, year1);
    return content;
}

function printResearchAssessment(reportdata, year1, year2) {

    let data = {};
    let content_research = '';
    let period = getPeriod(year1);
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    data["unit"] = reportdata.unit;
    content_research = '<h1 style="text-align: center;">' + data.unit + '</h1><div style="margin-botton:30px;"></div><h1 style="text-align: center;">Annual Assessment Report (' + year1 + '-' + year2 + ')</h1>';

    data["mission"] = reportdata.mission;
    data["vision"] = reportdata.vision;

    content_research += '<div style="margin-botton:30px;"></div><h3 style="text-align: center;">Director: ' + reportdata.firstName + ' ' + reportdata.lastName + '</h3>' +
        '<h4>MISSION</h4>' +
        '<p class="mission">' + data.mission + '</p>' +
        '<h4>VISION</h4>' +
        '<p class="vision">' + data.vision + '</p>';

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

    addTotal3 = {
        1: data["additionalAmount1"],
        2: data["additionalAmount2"],
        3: data["additionalAmount3"]
    };
    data["total"] = add(addTotal3);

    let totalBudget = formatter.format(data["total"]);
    let currencyFormat1 = formatter.format(data.additionalAmount1);
    let currencyFormat2 = formatter.format(data.additionalAmount2);
    let currencyFormat3 = formatter.format(data.additionalAmount3);

    content_research += '<h4> ANNUAL BUDGET </h4>' +
        '<div class="annual-budget"><p>' + data.annualBudget + '</p>' +
        '<h4> Number of State and RF Employees/FTEs.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">State</th><th class="border_bottom" width="36.5%">RF</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">#Employees (Headcounts)</th><td style=" text-align: center;">' + data.employeesState + '</td><td style=" text-align: center;">' +
        data.employeesRF + '</td></tr>' +
        '<tr><th class="border_right">#FTEs</th><td style=" text-align: center;">' + data.fteState + '</td><td style=" text-align: center;">' +
        data.fteRF + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +

        '<div class="annual-budget"> ' +
        '<h4> Source of Other Revenue Generated</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Funding Source</th><th class="border_bottom" width="36.5%">Amount</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Name of Additional Source 1 </th><td style=" text-align: center;">' + data.additionalSource1 + '</td><td style=" text-align: center;">' +
        currencyFormat1 + '</td></tr>' +
        '<tr><th class="border_right">Name of Additional Source 2</th><td style=" text-align: center;">' + data.additionalSource2 + '</td><td style=" text-align: center;">' +
        currencyFormat2 + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Name of Additional Source 3 </th><td style=" text-align: center;">' + data.additionalSource3 + '</td><td style=" text-align: center;">' +
        currencyFormat3 + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Total </th><td style=" text-align: center;"> </td><td style=" text-align: center;">' +
        totalBudget + '</td></tr>' +
        '</tbody></table></div>';

    data["federalApplicationsGoal"] = checkNull(reportdata.federalApplicationsGoal, true);
    data["federalApplicationsActual"] = checkNull(reportdata.federalApplicationsActual, true);
    data["stateApplicationsGoal"] = checkNull(reportdata.stateApplicationsGoal, true);
    data["stateApplicationsActual"] = checkNull(reportdata.stateApplicationsActual, true);
    data["privateApplicationsGoal"] = checkNull(reportdata.privateApplicationsGoal, true);
    data["privateApplicationsActual"] = checkNull(reportdata.privateApplicationsActual, true);

    addGoals = { 1: data["federalApplicationsGoal"], 2: data["stateApplicationsGoal"], 3: data["privateApplicationsGoal"] };
    addActual = { 1: data["federalApplicationsActual"], 2: data["stateApplicationsActual"], 3: data["privateApplicationsActual"] };

    data["proposal_total_goals"] = add(addGoals);
    data["proposal_total_actual"] = add(addActual);

    data["federalAwardsGoal"] = checkNull(reportdata.federalAwardsGoal, true);
    data["federalAwardsActual"] = checkNull(reportdata.federalAwardsActual, true);
    data["stateAwardsGoal"] = checkNull(reportdata.stateAwardsGoal, true);
    data["stateAwardsActual"] = checkNull(reportdata.stateAwardsActual, true);
    data["privateAwardsGoal"] = checkNull(reportdata.privateAwardsGoal, true);
    data["privateAwardsActual"] = checkNull(reportdata.privateAwardsActual, true);

    addGoals = { 1: data["federalAwardsGoal"], 2: data["stateAwardsGoal"], 3: data["privateAwardsGoal"] };
    addActual = { 1: data["federalAwardsActual"], 2: data["stateAwardsActual"], 3: data["privateAwardsActual"] };

    data["awards_goal_total"] = add(addGoals);
    data["awards_actual_total"] = add(addActual);

    data["lsProposalsGoal"] = checkNull(reportdata.lsProposalsGoal, true);
    data["lsProposalsActual"] = checkNull(reportdata.lsProposalsActual, true);
    data["lsAwardsGoal"] = checkNull(reportdata.lsAwardsGoal, true);
    data["lsAwardsActual"] = checkNull(reportdata.lsAwardsActual, true);

    data["sttrProposalsGoal"] = checkNull(reportdata.sttrProposalsGoal, true);
    data["sttrProposalsActual"] = checkNull(reportdata.sttrProposalsActual, true);
    data["sttrAwardssGoal"] = checkNull(reportdata.sttrAwardssGoal, true);
    data["sttrAwardsActual"] = checkNull(reportdata.sttrAwardsActual, true);

    content_research += '<h4> PROPOSALS</h4>' +
        '<div class="annual-budget">' +
        '<h4> Number of Research Proposals Submitted to Extramural Sponsors</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Federal Applications</th><td style=" text-align: center;">' + data.federalApplicationsGoal + '</td><td style=" text-align: center;">' +
        data.federalApplicationsActual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top ">State Applications</th><td style=" text-align: center;">' + data.stateApplicationsGoal + '</td><td style=" text-align: center;">' +
        data.stateApplicationsActual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top ">Private/Other Sponsors Applications</th><td style=" text-align: center;">' + data.privateApplicationsGoal + '</td><td style=" text-align: center;">' +
        data.privateApplicationsActual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top">Total</th><td style=" text-align: center;">' + data.proposal_total_goals + '</td><td style=" text-align: center;">' +
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
        '<th class="border_right padding_bottom padding_top">Federals Awards </th><td style=" text-align: center;">' + data.federalAwardsGoal + '</td><td style=" text-align: center;">' +
        data.federalAwardsActual + '</td></tr>' +
        '<tr><th class="border_right">State Awards </th><td style=" text-align: center;">' + data.stateAwardsGoal + '</td><td style=" text-align: center;">' +
        data.stateAwardsActual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Private Awards </th><td style=" text-align: center;">' + data.privateAwardsGoal + '</td><td style=" text-align: center;">' +
        data.privateAwardsActual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Total </th><td style=" text-align: center;">' + data.awards_goal_total + '</td><td style=" text-align: center;">' +
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
        '<th class="border_right padding_bottom padding_top">#Proposals </th><td style=" text-align: center;">' + data.lsProposalsGoal + '</td><td style=" text-align: center;">' +
        data.lsProposalsActual + '</td></tr>' +
        '<tr><th class="border_right">#Awards </th><td style=" text-align: center;">' + data.lsAwardsGoal + '</td><td style=" text-align: center;">' +
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
        '<th class="border_right padding_bottom padding_top">#Proposals </th><td style=" text-align: center;">' + data.sttrProposalsGoal + '</td><td style=" text-align: center;">' +
        data.sttrProposalsActual + '</td></tr>' +
        '<tr><th class="border_right">#Awards </th><td style=" text-align: center;">' + data.sttrAwardssGoal + '</td><td style=" text-align: center;">' +
        data.sttrAwardsActual + '</td></tr>' +
        '</tbody></table></div>';

    //detailed research
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

    content_research += '<h4> PUBLICATIONS </h4>' +
        '<div class="annual-budget">' +
        '<h4>Number of Publications by Center/Institute/Lab in the past FY</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Books Authored/Edited </th><td style=" text-align: center;">' + data.booksAuthoredGoal + '</td><td style=" text-align: center;">' +
        data.booksAuthoredActual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top">Books Chapters Authored/Edited  </th><td style=" text-align: center;">' + data.bookChaptersGoal + '</td><td style=" text-align: center;">' +
        data.bookChaptersActual + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top ">Publications</th><td style=" text-align: center;">' + data.publicationsGoal + '</td><td style=" text-align: center;">' +
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
        '<th class="border_right padding_bottom padding_top">Intellectual Property Disclosures </th><td style=" text-align: center;">' + data.intellectualPropertiesGoal + '</td><td style=" text-align: center;">' +
        data.intellectualPropertiesActual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top">Patents Applications </th><td style=" text-align: center;">' + data.patentAppsGoal + '</td><td style=" text-align: center;">' +
        data.patentAppsActual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Patents Issued  </th><td style=" text-align: center;">' + data.patentsIssuedGoal + '</td><td style=" text-align: center;">' +
        data.patentsIssuedActual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Patents Licensed </th><td style=" text-align: center;">' + data.patentsLicenesedGoal + '</td><td style=" text-align: center;">' +
        data.patentsLicenesedActual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">License Executed </th><td style=" text-align: center;">' + data.licensesExecutedGoal + '</td><td style=" text-align: center;">' +
        data.licensesExecutedActual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">License Revenue </th><td style=" text-align: center;">' + (isNaN(data.licensedRevenueGoal) ? data.licensedRevenueGoal : formatter.format(data.licensedRevenueGoal)) + '</td><td style=" text-align: center;">' +
        (isNaN(data.licensedRevenueActual) ? data.licensedRevenueActual : formatter.format(data.licensedRevenueActual)) + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Start-up Companies </th><td style=" text-align: center;">' + data.startupCompaniesGoal + '</td><td style=" text-align: center;">' +
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
        '<th style="text-align: left; width: 50%;">Your Goals for FY ' + period + ' </th><td>' + data.conferencesGoal + '</td></tr>' +
        '<tr><th style="text-align: left;">Actual Numbers </th><td>' + data.conferencesActual + '</td>' +
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

    content_research += '<h4> EDUCATION AND TRAINING </h4>' +
        '<div class="annual-budget">' +
        '<h4> Number of Undergraduate/Graduate/Postdoc Trained.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td><th class="border_bottom" width="25%">Undergraduate</th>' +
        '<th class="border_bottom" width="25%">Graduate - Master </th>' +
        '<th class="border_bottom" width=25%">Graduate - PhD </th>' +
        '<th class="border_bottom" width="25%">Postdoctoral </th>' +
        '</tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">#Students - Your Goal for FY ' + period + '</th><td style=" text-align: center;">' + data.undergraduateStudentsGoal + '</td>' +
        '<td style=" text-align: center;">' + data.graduateStudentsGoal + '</td> ' +
        '<td style=" text-align: center;">' + data.graduatePhdStudentsGoal + '</td> ' +
        '<td style=" text-align: center;">' + data.phdStudentsGoal + '</td> ' +
        '</tr>' +
        '<tr><th class="border_right padding_bottom padding_top">#Students - Actual Numbers</th><td style=" text-align: center;">' + data.undergraduateStudentsActual + '</td>' +
        '<td style=" text-align: center;">' + data.graduateStudentsActual + '</td> ' +
        '<td style=" text-align: center;">' + data.graduatePhdStudentsActual + '</td> ' +
        '<td style=" text-align: center;">' + data.phdStudentsActual + '</td> ' +
        '</tr>' +
        '<tr><th class="border_right padding_bottom padding_top"> Nature of Mentoring</th><td style=" text-align: center;">' + data.natureOfMentoringUndergradudate + '</td>' +
        '<td style=" text-align: center;">' + data.natureOfMentoringGraduate + '</td> ' +
        '<td style=" text-align: center;">' + data.natureOfMentoringGraduatePhd + '</td> ' +
        '<td style=" text-align: center;">' + data.natureOfMentoringPhd + '</td> ' +
        '</tr>' +
        '</tbody></table></div>';

    content_research += goalDetailsResearch(reportdata);

    achievementdata = [];
    if (reportdata.topAchievements1 != '')
        achievementdata.push(reportdata.topAchievements1);
    else
        achievementdata.push("N/A");
    if (reportdata.topAchievements2 != '')
        achievementdata.push(reportdata.topAchievements2);
    else
        achievementdata.push("N/A");
    if (reportdata.topAchievements3 != '')
        achievementdata.push(reportdata.topAchievements3);
    else
        achievementdata.push("N/A");
    if (reportdata.topAchievements4 != '')
        achievementdata.push(reportdata.topAchievements4);
    else
        achievementdata.push("N/A");
    if (reportdata.topAchievements5 != '')
        achievementdata.push(reportdata.topAchievements5);
    else
        achievementdata.push("N/A");

    content_research += printTopAchievements(achievementdata);
    content_research += '<br><br>';

    if (reportdata.hasOwnProperty("otherAchievements"))
        content_research += printOtherAchievements(reportdata)

    data["noofpartners"] = reportdata.noofpartners
    if (reportdata.hasOwnProperty("partners"))
        data["partners"] = reportdata.partners;
    content_research += printListOfPartners(data);

    otherdata = {};
    otherdata["opportunities"] = reportdata.otherThoughtsToGrowResearch;
    otherdata["challenges"] = reportdata.bigChallenges;
    otherdata["needs"] = reportdata.resourceNeeds;
    otherdata["strategies"] = reportdata.strategicSuggestions;
    otherdata["suggestions"] = reportdata.otherthoughts;
    content_research += printOtherThoughts(otherdata);

    return content_research;
}

function printResearchPlanning(reportdata, year1, year2) {
    let data = {};
    data["unit"] = reportdata.unit;

    data["mission"] = reportdata.mission;
    data["vision"] = reportdata.vision;
    //  content += addMissionAndVision(ids, data);
    data["annualBudget"] = reportdata.annualBudget;
    data["employeesState"] = checkNull(reportdata.stateHeadcount);
    data["employeesRF"] = checkNull(reportdata.rfHeadcount);
    data["fteState"] = checkNull(reportdata.stateNumber);
    data["fteRF"] = checkNull(reportdata.rfNumber);
    // content += addAnnualBudget(ids, data);
    data["federalApplication"] = checkNull(reportdata.proposals1);
    data["stateApplication"] = checkNull(reportdata.proposals2);
    data["privateApplication"] = checkNull(reportdata.proposals3);
    if (data["federalApplication"] == "N/A" || data["stateApplication"] == "N/A" || data["privateApplication"] == "N/A") {
        if (data["federalApplication"] == "N/A" && data["stateApplication"] == "N/A" && data["privateApplication"] == "N/A") {
            addData9 = "N/A";
        }
        else if (data["federalApplication"] == "N/A" && data["stateApplication"] == "N/A") {
            var privateApplication = parseInt(data.privateApplication);
            addData9 = privateApplication;
        }
        else if (data["federalApplication"] == "N/A" && data["privateApplication"] == "N/A") {
            var stateApplication = parseInt(data.stateApplication);
            addData9 = stateApplication;
        }
        else if (data["stateApplication"] == "N/A" && data["privateApplication"] == "N/A") {
            var federalApplication = parseInt(data.federalApplication);
            addData9 = federalApplication;
        }
        else if (data["federalApplication"] == "N/A") {
            var stateApplication = parseInt(data.stateApplication);
            var privateApplication = parseInt(data.privateApplication);

            addData9 = stateApplication + privateApplication;
        }
        else if (data["stateApplication"] == "N/A") {
            var federalApplication = parseInt(data.federalApplication);
            var privateApplication = parseInt(data.privateApplication);

            addData9 = federalApplication + privateApplication;
        }
        else if (data["privateApplication"] == "N/A") {
            var stateApplication = parseInt(data.stateApplication);
            var federalApplication = parseInt(data.federalApplication);

            addData9 = stateApplication + federalApplication;
        }
    }
    else {
        var federalApplication = parseInt(data.federalApplication);
        var stateApplication = parseInt(data.stateApplication);
        var privateApplication = parseInt(data.privateApplication);

        addData9 = federalApplication + stateApplication + privateApplication;
    }

    data["proposal_total"] = addData9;

    data["federalAwards"] = checkNull(reportdata.awards1);
    data["stateAwards"] = checkNull(reportdata.awards2);
    data["privateAwards"] = checkNull(reportdata.awards3);

    if (data["federalAwards"] == "N/A" || data["stateAwards"] == "N/A" || data["privateAwards"] == "N/A") {
        if (data["federalAwards"] == "N/A" && data["stateAwards"] == "N/A" && data["privateAwards"] == "N/A") {
            addData11 = "N/A";
        }
        else if (data["federalAwards"] == "N/A" && data["stateAwards"] == "N/A") {
            var privateAwards = parseInt(data.privateAwards);
            addData11 = privateAwards;
        }
        else if (data["federalAwards"] == "N/A" && data["privateAwards"] == "N/A") {
            var stateAwards = parseInt(data.stateAwards);
            addData11 = stateAwards;
        }
        else if (data["stateAwards"] == "N/A" && data["privateAwards"] == "N/A") {
            var federalAwards = parseInt(data.federalAwards);
            addData11 = federalAwards;
        }
        else if (data["federalAwards"] == "N/A") {
            var stateAwards = parseInt(data.stateAwards);
            var privateAwards = parseInt(data.privateAwards);

            addData11 = stateAwards + privateAwards;
        }
        else if (data["stateAwards"] == "N/A") {
            var federalAwards = parseInt(data.federalAwards);
            var privateAwards = parseInt(data.privateAwards);

            addData11 = federalAwards + privateAwards;
        }
        else if (data["privateAwards"] == "N/A") {
            var stateAwards = parseInt(data.stateAwards);
            var federalAwards = parseInt(data.federalAwards);

            addData11 = stateAwards + federalAwards;
        }
    }
    else {
        var federalAwards = parseInt(data.federalAwards);
        var stateAwards = parseInt(data.stateAwards);
        var privateAwards = parseInt(data.privateAwards);

        addData11 = federalAwards + stateAwards + privateAwards;
    }

    data["awrds_total"] = addData11;

    data["proposal"] = checkNull(reportdata.largeScale1);
    data["lsAwards"] = checkNull(reportdata.largeScale2);

    data["stProposal"] = checkNull(reportdata.sttrAwards1);
    data["stAwards"] = checkNull(reportdata.sttrAwards2);

    data["booksAuthored"] = checkNull(reportdata.publication1);
    data["booksChapters"] = checkNull(reportdata.publication2);
    data["publicationsTable"] = checkNull(reportdata.publication3);

    data["intellectual"] = checkNull(reportdata.technologyTransfer1);
    data["patentsApplications"] = checkNull(reportdata.technologyTransfer2);
    data["patentsIssued"] = checkNull(reportdata.technologyTransfer3);
    data["patentsLicensed"] = checkNull(reportdata.technologyTransfer4);
    data["licensedExecuted"] = checkNull(reportdata.technologyTransfer5);
    data["licensedRevenue"] = checkNull(reportdata.technologyTransfer6);
    data["startupCompanies"] = checkNull(reportdata.technologyTransfer7);

    data["goals"] = checkNull(reportdata.conference);

    data["undergraduate"] = checkNull(reportdata.educationAndTraining1);
    data["graduate_masters"] = checkNull(reportdata.educationAndTraining2);
    data["graduate_phd"] = checkNull(reportdata.educationAndTraining3);
    data["post"] = checkNull(reportdata.educationAndTraining4);
    let period = getPeriod(year1);
    let content_research1 = '<h1 style="text-align: center;">' + data.unit + '</h1><div style="margin-botton:30px;"></div><h1 style="text-align: center;">Planning Report (' + year1 + '-' + year2 + ')</h1>';
    content_research1 +=
        '<div style="margin-botton:30px;"></div><h3 style="text-align: center;">Director: ' + reportdata.firstName + ' ' + reportdata.lastName + '</h3>' +
        '<h4>MISSION</h4>' +
        '<p class="mission">' + data.mission + '</p>' +
        '<h4>VISION</h4>' +
        '<p class="vision">' + data.vision + '</p>' +

        '<h4> ANNUAL BUDGET </h4>' +
        '<div class="annual-budget">' +
        '<h4> Number of State and RF Employees/FTEs.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td><th class="border_bottom" width="36.5%">State</th><th class="border_bottom" width="36.5%">RF</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">#Employees (Headcounts)</th><td style=" text-align: center;">' + data.employeesState + '</td><td style=" text-align: center;">' +
        data.employeesRF + '</td></tr>' + '<tr><th class="border_right">#FTEs</th><td style=" text-align: center;">' + data.fteState + '</td><td style=" text-align: center;">' +
        data.fteRF + '</td></tr></tbody></table></div>' +

        '<h4> RESEARCH PERFORMANCE TARGET </h4>' +
        '<div class="annual-budget">' +
        '<h4> The target numbers are indicated below:</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;">' +
        '</td><th class="border_bottom" width="36.5%">Your Goal for FY ' + period + '</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">Federal Applications</th>' +
        '<td style=" text-align: center;">' + data.federalApplication + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">State Applications</th><td style=" text-align: center;">' +
        data.stateApplication + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Private Applications</th><td style=" text-align: center;">' +
        data.privateApplication + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Total</th><td style=" text-align: center;">' +
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
        '<td  style=" text-align: center;" >' + data.federalAwards + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">State Awards</th><td  style=" text-align: center;">' +
        data.stateAwards + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Private Awards</th><td  style=" text-align: center;">' +
        data.privateAwards + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Total</th><td  style=" text-align: center;">' +
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
        '<td  style=" text-align: center;">' + data.proposal + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">#Awards</th><td  style=" text-align: center;">' +
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
        '<td  style=" text-align: center;">' + data.stProposal + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">#Awards</th><td  style=" text-align: center;">' +
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
        '<td  style=" text-align: center;">' + data.booksAuthored + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Books Chapters - Authored/Edited </th><td  style=" text-align: center;">' +
        data.booksChapters + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Publications</th><td  style=" text-align: center;">' +
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
        '<td  style=" text-align: center;">' + data.intellectual + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Patents Applications</th><td style=" text-align: center;" >' +
        data.patentsApplications + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Patents Isssued</th><td  style=" text-align: center;">' +
        data.patentsIssued + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Patents Licensed</th><td  style=" text-align: center;">' +
        data.patentsLicensed + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Licenses Executed</th><td  style=" text-align: center;">' +
        data.licensedExecuted + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Licenses Revenue</th><td  style=" text-align: center;">' +
        data.licensedRevenue + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Start-up Companies</th><td  style=" text-align: center;">' +
        data.startupCompanies + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +

        '<h4>CONFERENCE/SEMINAR PRESENTATIONS </h4>' +

        '<div class="annual-budget">' +
        '<h4> The target numbers are indicated below:</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;">' +
        '</td><th class="border_bottom" width="36.5%">Your Goal for FY ' + period + '</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">Your Goal for FY 20-21</th>' +
        '<td style=" text-align: center;">' + data.goals + '</td></tr>' +

        '</tbody></table></div>' +
        '</br>' +

        '<h4>EDUCATION AND TRAINING </h4>' +

        '<div class="annual-budget">' +
        '<h4>Number of Undergraduate/Graduate/Postdoc Trained.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;">' +
        '</td><th class="border_bottom" width="36.5%">#Students - Your Goal for FY ' + period + '</th></tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">Undergraduate</th>' +
        '<td  style=" text-align: center;">' + data.undergraduate + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Graduate - Master</th><td  style=" text-align: center;">' +
        data.graduate_masters + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Graduate - PhD</th><td  style=" text-align: center;">' +
        data.graduate_phd + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Postdoctoral</th><td  style=" text-align: center;">' +
        data.post + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>';

    content_research1 += goalPlanningDetailsResearch(reportdata, year1);
    return content_research1;
}

let checkNull = function (value, num = false) {

    if (typeof value === "undefined" || value === "") {
        if (num)
            return "0";
        else
            return 'N/A';
    }
    else {
        return value;
    }
}

let add = function (value) {
    var sum = 0;

    for (var i = 1; i <= Object.keys(value).length; i++) {

        sum += parseInt(value[i], 10);
    }
    return sum;
}

let formatPara = function (text) {
    let result = '';
    if (typeof text === "undefined") {

    }
    else {
        let paras = text.split("\n\n");
        for (var i = 0; i < paras.length; i++) {
            let para = paras[i];

            let lines = para.split(/\n(?=\d |\d.\t|[1-9]\d([0-9]\d){0,2}| \d.\t|\r\n|•\t|i\.|ii\.|iii\.|iv\.|v\.)/);


            for (var j = 0; j < lines.length; j++) {
                if (lines[j] == '' || typeof lines[j] === "undefined") continue;
                result += '<p>' + lines[j] + '</p>';
            }

        }
    }
    return result;
}

let goalDetailsResearch = function (reportdata, year) {

    let content = '';
    for (var i = 1; i < 6; i++) {
        let goal = new GoalPlan(i, reportdata["goal" + i], reportdata["actions" + i],
            reportdata["metrics" + i], reportdata["timeframe" + i], reportdata["primaryLeader" + i],
            reportdata["impactWorkplan" + i], reportdata["collaboratingUnits" + i],
            reportdata["impactResearchExcellence" + i]);
        content += printSmartGoal(goal, year);
    }
    return content;
}

let printListOfPartners = function (data) {
    let content = '<div class="partners"><p><b>LIST OF PARTNERS/AFFILIATES </b><br>Total No of Partners: ' + data.noofpartners + '</p>';
    let partners = data.hasOwnProperty("partners") ? data["partners"] : [];
    if (partners.length > 0) {
        content += '<table class="table thead-dark table-hover">' +
            '<thead><tr>' +
            '<th scope="col">#</th>' +
            '<th scope="col" style="text-align:left">Details</th>' +
            '</tr></thead>' +
            '<tbody>';
        var i = 0;
        partners.forEach(element => {
            i++;
            content += '<tr><th scope="row" style = "vertical-align: top;">' + i + '</th>' +
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
    return content;
}

let goalPlanningDetailsAdmin = function (reportdata, year) {

    let content = '';

    for (var i = 1; i < 6; i++) {
        let goal = new GoalPlan(i, reportdata["goal" + i], reportdata["actions" + i],
            reportdata["metrics" + i], reportdata["timeframe" + i], reportdata["primaryLeader" + i],
            reportdata["impactWorkplan" + i], reportdata["collaboratingUnits" + i],
            reportdata["impactResearchExcellence" + i]);
        content += printSmartGoalPlan(goal, year);
    }

    return content;
}

let goalPlanningDetailsResearch = function (reportdata, year) {
    let content = '';
    for (var i = 1; i < 6; i++) {

        let goal = new GoalPlan(i, reportdata["goal" + i], reportdata["actions" + i],
            reportdata["metrics" + i], reportdata["timeframe" + i], reportdata["primaryLeader" + i],
            reportdata["impactWorkplan" + i], reportdata["collaboratingUnits" + i],
            reportdata["impactResearchExcellence" + i]);
        content += printSmartGoalPlan(goal, year);
    }
    return content;
}

let printOrganizationalMemberships = function (data) {
    let organizations = '<div><table width="100%"><thead><tr><th class="border_bottom border_right" width="36.5%">Name of Organization/Membership​</th><th class="border_bottom" width="36.5%">Benefits</th></tr></thead><tbody>';

    for (var i = 1; i < 7; i++) {
        if (data['membership' + i] != "")
            organizations += '<tr><td style="text-align: left;" class="border_right border_bottom">' + data['membership' + i] + '</td>';
        if (data['benefit' + i] != "")
            organizations += '<td class="border_bottom" style="text-align: left;">' + data['benefit' + i] + '</td></tr>';
    }
    organizations += '</tbody></table></div>';
    return organizations;

}

class Goal {
    constructor(no, goal, action, metric, timeframe, actionsImplemented, results, changes) {
        this.no = no;
        this.goal = goal;
        this.action = action;
        this.metric = metric;
        this.timeFrame = timeframe;
        this.actionsImplemented = actionsImplemented;
        this.results = results;
        this.changes = changes;
    }
}

class GoalPlan {
    constructor(no, goal, action, metric, timeframe, primaryLeader, circumstances, collaborations, impact) {
        this.no = no;
        this.goal = goal;
        this.action = action;
        this.metric = metric;
        this.timeFrame = timeframe;
        this.primaryLeader = primaryLeader;
        this.circumstances = circumstances;
        this.collaborations = collaborations;
        this.impact = impact;
    }
}

let printSmartGoal = function (goal, year) {
    let period = getPeriod(year);
    let smartgoal = '<h4>FY ' + period + ' SMART GOAL ' + goal.no + '</h4>';
    smartgoal += '<div class="goal"><p><b>Goal: </b>' + (goal.goal == '' ? 'N/A' : formatText(goal.goal)) + '</p> </div>';
    smartgoal += '<div class="goalresult"><p><b>Actions Implemented: </b>' + (goal.action == '' ? 'N/A' : formatText(goal.action)) + '</p>';
    smartgoal += '<p><b>Noteworthy Results of Assessment: </b>' + (goal.metric == '' ? 'N/A' : formatText(goal.metric)) + '</p>';
    smartgoal += '<p><b>Changes Made/Planned: </b>' + (goal.timeFrame == '' ? 'N/A' : formatText(goal.timeFrame)) + '</p></div>';
    return smartgoal;
}

let printSmartGoalPlan = function (goal, year) {
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
    return smartgoal;
}

let printTopAchievements = function (data) {
    let achievements = '<div class="achievements">' +
        '<p><br><b>TOP 3-5 ACHIEVEMENTS:</b></p>';
    for (var i = 0; i < data.length; i++) {
        achievements += '<p><b>Achievement ' + (i + 1) + ': </b><p>';
        achievements += formatText(data[i]);
    }
    achievements += "</div>";
    return achievements;

}

let printOtherAchievements = function (data) {
    let achievements = '<div class="achievements">' +
        '<p><br><b>OTHER ACHIEVEMENTS:</b></p>';
    for (var i = 0; i < data.otherAchievements.length; i++) {
        achievements += '<p><b>Achievement ' + (i + 1) + ': </b><p>';
        achievements += formatText(data.otherAchievements[i].Achievement);
    }
    achievements += "</div>";
    return achievements;

}

let printOtherThoughts = function (data) {
    let otherthoughts = '<div class="other-thoughts"><p><b>OTHER THOUGHTS AND SUGGESTIONS: <br>Big Opportunities: </b>' + (data.opportunities == '' ? 'N/A' : data.opportunities) + '</p>' +
        '<p><b>Big Challenges: </b>' + (data.challenges == '' ? 'N/A' : data.challenges) + '</p>' +
        '<p><b>Resource Needs: </b>' + (data.needs == '' ? 'N/A' : data.needs) + '</p>' +
        '<p><b>Strategy Suggestions to Grow Research: </b>' + (data.strategies == '' ? 'N/A' : data.strategies) + '</p>' +
        '<p><b>Other Thoughts and Suggestions: </b>' + (data.suggestions == '' ? 'N/A' : data.suggestions) + '</p></div>';
    return otherthoughts;

}

let formatText = function (text) {
    let result = '';
    if (typeof text === "undefined" || isNaN(text) == false) {
        return text;
    }
    else {
        let paras = text.split("\n\n");
        for (var i = 0; i < paras.length; i++) {
            let para = paras[i];
            if (para.includes("\n") == false && para.search(/d.\t/) == -1) {
                result += para;
            }
            else {
                let lines = para.split(/\n(?=\d. |\d.\t| \d.\t|\r\n|•\t|i\.|ii\.|iii\.|iv\.|v\.)/);
                if (lines.length == 1) {
                    result += lines[0];
                }
                else {
                    for (var j = 0; j < lines.length; j++) {
                        if (lines[j] == '') continue;
                        result += '<p>' + lines[j] + '</p>';
                    }
                }
            }
        }
    }

    return result;
}

let getPeriod = function (year) {
    let period = '';
    if (year == 2019)
        period = '19-20';
    else if (year == 2020)
        period = '20-21';
    else
        period = '21-22';

    return period;
}