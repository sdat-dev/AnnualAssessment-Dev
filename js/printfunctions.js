
function printAdminAssessment(reportdata, year1, year2) {
    let data = {};
    data["unit"] = reportdata["Unit"];

    if (year1 == '2019') {
        data["mission"] = reportdata["1819Mission"];
        data["vision"] = reportdata["1819Vision"];
    }
    else {
        data["mission"] = reportdata.mission;
        data["vision"] = reportdata.vision;
    }

    data["annualBudget"] = reportdata.annualBudget;
    data["employeesState"] = reportdata.stateHeadcount;
    data["employeesRF"] = reportdata.rfHeadcount;
    data["fteState"] = reportdata.stateNumber;
    data["fteRF"] = reportdata.rfNumber;
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
    content += goalDetailsAdmin(reportdata, year1, year2);
    return content;
}

let goalDetailsAdmin = function (reportdata, year1, year2) {

    let content = '';
    let data = {};

    for (var i = 1; i < 7; i++) {
        data['membership' + i] = reportdata["organization" + i];
        data['benefit' + i] = reportdata["membershipBenefit" + i];
    }
    content += printOrganizationalMemberships(data);

    for (var i = 1; i <= 5; i++) {

        let no = i;
        let goal = new Goal(no, reportdata["goal" + i], reportdata["actions" + i],
            reportdata["metrics" + i], reportdata["timeframe" + i], reportdata["actionsImplemented" + i], reportdata["noteworthResults" + i], reportdata["changes" + i]);
        content += addSmartGoal(ids, goal, year1);

    }

    data = [];
    if (reportdata.topAchievements1 != 'false' && reportdata.noteworthResults1 != '')
        data.push(reportdata.noteworthResults1);
    if (reportdata.topAchievements2 != 'false' && reportdata.noteworthResults2 != '')
        data.push(reportdata.noteworthResults2);
    if (reportdata.topAchievements3 != 'false' && reportdata.noteworthResults3 != '')
        data.push(reportdata.noteworthResults3);
    if (reportdata.topAchievements4 != 'false' && reportdata.noteworthResults4 != '')
        data.push(reportdata.noteworthResults4);
    if (reportdata.topAchievements5 != 'false' && reportdata.noteworthResults5 != '')
        data.push(reportdata.noteworthResults5);
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
    data["unit"] = reportdata.Unit
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

    data["unit"] = reportdata.Unit;

    data["mission"] = reportdata.mission;
    data["vision"] = reportdata.vision;

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

    data["total3"] = checkNull(addTotal3);
    data["total33"] = checkNull(addTotal3);

    addData = {};
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

    data["awards"] = reportdata.Q52;
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

    data["largeScale"] = checkNull(reportdata.Q53);
    data["proposal_goals"] = checkNull(reportdata.largeScale1);
    data["proposal_actual"] = checkNull(reportdata.largeScale2);
    data["lsAwards_goals"] = checkNull(reportdata.largeScale3);
    data["lsAwards_actual"] = checkNull(reportdata.largeScale4);

    data["strr"] = checkNull(reportdata.Q54);

    data["stProposal_goals"] = checkNull(reportdata.sttrAwards1);
    data["stProposal_actual"] = checkNull(reportdata.sttrAwards2);

    data["stAwards_goals"] = checkNull(reportdata.sttrAwards3);
    data["stAwards_actual"] = checkNull(reportdata.sttrAwards4);

    //detailed research

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
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    let totalBudget = formatter.format(data.nameOfadditionalsource1 + data.nameOfadditionalsource2 + data.nameOfadditionalsource3);
    let currencyFormat1 = formatter.format(data.nameOfadditionalsource1);
    let currencyFormat2 = formatter.format(data.nameOfadditionalsource2);
    let currencyFormat3 = formatter.format(data.nameOfadditionalsource3);
    let proposal_total_actual = data.federalApplicationactual + data.stateApplicationactual + data.privateApplicationactual;
    if (reportdata.hasOwnProperty("partners"))
        data["partners"] = reportdata.partners;
    let content_research = '';
    let period = getPeriod(year1);
    content_research = '<h1 style="text-align: center;">' + data.unit + '</h1><div style="margin-botton:30px;"></div><h1 style="text-align: center;">Annual Assessment Report (' + year1 + '-' + year2 + ')</h1>';
    content_research +=

        '<div style="margin-botton:30px;"></div><h3 style="text-align: center;">Director: ' + reportdata.firstName + ' ' + reportdata.lastName + '</h3>' +
        '<h4>MISSION</h4>' +
        '<p class="mission">' + data.mission + '</p>' +
        '<h4>VISION</h4>' +
        '<p class="vision">' + data.vision + '</p>' +

        '<h4> ANNUAL BUDGET </h4>' +
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
        '<th class="border_right padding_bottom padding_top">Name of Additional Source 1 </th><td style=" text-align: center;">' + data.nameOfadditionalsource11 + '</td><td style=" text-align: center;">' +
        currencyFormat1 + '</td></tr>' +
        '<tr><th class="border_right">Name of Additional Source 2</th><td style=" text-align: center;">' + data.nameOfadditionalsource21 + '</td><td style=" text-align: center;">' +
        currencyFormat2 + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Name of Additional Source 3 </th><td style=" text-align: center;">' + data.nameOfadditionalsource31 + '</td><td style=" text-align: center;">' +
        currencyFormat3 + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Total </th><td style=" text-align: center;">' + data.total3 + '</td><td style=" text-align: center;">' +
        totalBudget + '</td></tr>' +
        '</tbody></table></div>' +

        '<h4> PROPOSALS</h4>' +
        '<div class="annual-budget">' +
        '<h4> Number of Research Proposals Submitted to Extramural Sponsors</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Federal Applications</th><td style=" text-align: center;">' + data.federalApplicationgoals + '</td><td style=" text-align: center;">' +
        data.federalApplicationactual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top ">State Applications</th><td style=" text-align: center;">' + data.stateApplicationgoals + '</td><td style=" text-align: center;">' +
        data.stateApplicationactual + '</td></tr>' +

        '<tr><th class="border_right  padding_bottom padding_top ">Private/Other Sponsors Applications</th><td style=" text-align: center;">' + data.privateApplicationgoals + '</td><td style=" text-align: center;">' +
        data.privateApplicationactual + '</td></tr>' +

        '<tr><th class="border_right  padding_bottom padding_top">Total</th><td style=" text-align: center;">' + data.proposal_total_goals + '</td><td style=" text-align: center;">' +
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
        '<th class="border_right padding_bottom padding_top">Federals Awards </th><td style=" text-align: center;">' + data.federalAwardsgoals + '</td><td style=" text-align: center;">' +
        data.federalAwardsactual + '</td></tr>' +
        '<tr><th class="border_right">State Awards </th><td style=" text-align: center;">' + data.stateAwardsgoals + '</td><td style=" text-align: center;">' +
        data.stateAwardsactual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Private Awards </th><td style=" text-align: center;">' + data.privateAwardsgoals + '</td><td style=" text-align: center;">' +
        data.privateAwardsactual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Total </th><td style=" text-align: center;">' + data.awrds_total_goals + '</td><td style=" text-align: center;">' +
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
        '<th class="border_right padding_bottom padding_top">#Proposals </th><td style=" text-align: center;">' + data.proposal_goals + '</td><td style=" text-align: center;">' +
        data.proposal_actual + '</td></tr>' +
        '<tr><th class="border_right">#Awards </th><td style=" text-align: center;">' + data.lsAwards_goals + '</td><td style=" text-align: center;">' +
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
        '<th class="border_right padding_bottom padding_top">#Proposals </th><td style=" text-align: center;">' + data.stProposal_goals + '</td><td style=" text-align: center;">' +
        data.stProposal_actual + '</td></tr>' +
        '<tr><th class="border_right">#Awards </th><td style=" text-align: center;">' + data.stAwards_goals + '</td><td style=" text-align: center;">' +
        data.stAwards_actual + '</td></tr>' +
        '</tbody></table></div>' +

        '<h4> PUBLICATIONS </h4>' +
        '<div class="annual-budget">' +
        '<h4>Number of Publications by Center/Institute/Lab in the past FY</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td>' +
        '<th class="border_bottom" width="36.5%">Your Goal in FY ' + period + '</th><th class="border_bottom" width="36.5%">Actual Number</th></tr></thead>' +
        '<tbody><tr>' +
        '<th class="border_right padding_bottom padding_top">Books Authored/Edited </th><td style=" text-align: center;">' + data.booksAuthoredgoals + '</td><td style=" text-align: center;">' +
        data.bookauthoredsactual + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top">Books Chapters Authored/Edited  </th><td style=" text-align: center;">' + data.bookschaptersgoals + '</td><td style=" text-align: center;">' +
        data.bookschapteractual + '</td></tr>' +

        '<tr><th class="border_right padding_bottom padding_top ">Publications</th><td style=" text-align: center;">' + data.publicationsgoals + '</td><td style=" text-align: center;">' +
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
        '<th class="border_right padding_bottom padding_top">Intellectual Property Disclosures </th><td style=" text-align: center;">' + data.intellctualgoals + '</td><td style=" text-align: center;">' +
        data.intellctualgoals + '</td></tr>' +
        '<tr><th class="border_right  padding_bottom padding_top">Patents Applications </th><td style=" text-align: center;">' + data.patentsactual + '</td><td style=" text-align: center;">' +
        data.patnetsgoals + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Patents Issued  </th><td style=" text-align: center;">' + data.patlicenesedlgoals + '</td><td style=" text-align: center;">' +
        data.patlicenesedlgoals + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Patents Licensed </th><td style=" text-align: center;">' + data.patlicgoals + '</td><td style=" text-align: center;">' +
        data.patlicactuals + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">License Executed </th><td style=" text-align: center;">' + data.licensedexecutedgoals + '</td><td style=" text-align: center;">' +
        data.licensedexecutedactual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">License Revenue </th><td style=" text-align: center;">' + data.licensedrevenuegoals + '</td><td style=" text-align: center;">' +
        data.licensedrevenueactual + '</td></tr>' +
        '<th class="border_right padding_bottom padding_top">Start-up Companies </th><td style=" text-align: center;">' + data.startupcompaniesgoals + '</td><td style=" text-align: center;">' +
        data.starupcomapnieseactual + '</td></tr>' +
        '</tbody></table></div>' +
        '</br>' +
        '</br>' +
        '<h4>List of Intellectual Property/Technology Transfer/Commercialization in the Past FY </h4>' +
        '<div class="annual-budget"><p>' + formatPara(data.listofintelletual) + '</p>' +
        '</div>' +
        '<br/>' +
        '<h4> CONFERENCE/SEMINAR PRESENTATIONS</h4>' +
        '<div class="annual-budget">' +
        '<h4> Numbers of all Keynote Address or Plenary Invited Presentations</h4>' +
        '<table width="100%">' +
        '<tbody><tr>' +
        '<th class="padding_bottom padding_top">Your Goals for FY ' + period + ' </th><td style=" text-align: center;">' + data.yougoaloffy19020 + '</td></tr>' +
        '<tr><th class="">Actual Numbers </th><td style=" text-align: center;">' + data.actualnumbers + '</td>' +
        '</tbody></table></div>' +
        '<br/>' +
        '<br/>' +
        '<h4> List of  all Keynote Address or Plenary Invited Presentations </h4>' +
        '<div class="annual-budget"><p>' + formatPara(data.listofkeynote) + '</p>' +
        '</div>' +
        '<br/>' +
        '<br/>' +
        '<h4> OTHER ACTIVITIES</h4>' +
        '<h4> List of other Scholarly Activity </h4>' +

        '<div class="annual-budget"><p>' + formatPara(data.otheractivities) + '</p>' +
        '</div>' +

        '<h4> EDUCATION AND TRAINING </h4>' +
        '<div class="annual-budget">' +
        '<h4> Number of Undergraduate/Graduate/Postdoc Trained.</h4>' +
        '<table width="100%"><thead><tr><td class="border_bottom border_right" style="width: 25%;"></td><th class="border_bottom" width="25%">Undergraduate</th>' +
        '<th class="border_bottom" width="25%">Graduate - Master </th>' +
        '<th class="border_bottom" width=25%">Graduate - PhD </th>' +
        '<th class="border_bottom" width="25%">Postdoctoral </th>' +
        '</tr></thead>' +
        '<tbody><tr><th class="border_right padding_bottom padding_top">#Students - Your Goal for FY ' + period + '</th><td style=" text-align: center;">' + data.students_goals_undergraduate + '</td>' +
        '<td style=" text-align: center;">' + data.students_goals_graduate + '</td> ' +
        '<td style=" text-align: center;">' + data.students_goals_graduate_phd + '</td> ' +
        '<td style=" text-align: center;">' + data.students_goals_phd + '</td> ' +

        '</tr>' +

        '<tr><th class="border_right padding_bottom padding_top">#Students - Actual Numbers</th><td style=" text-align: center;">' + data.students_actual_undergraduate + '</td>' +
        '<td style=" text-align: center;">' + data.students_actual_graduate + '</td> ' +
        '<td style=" text-align: center;">' + data.students_actual_graduate_phd + '</td> ' +
        '<td style=" text-align: center;">' + data.students_actual_phd + '</td> ' +

        '</tr>' +

        '<tr><th class="border_right padding_bottom padding_top"> Nature of Mentoring</th><td style=" text-align: center;">' + data.nature_of_mentoring_undergradudate + '</td>' +
        '<td style=" text-align: center;">' + data.nature_of_mentoring_graduate + '</td> ' +
        '<td style=" text-align: center;">' + data.nature_of_mentoring_graduate_phd + '</td> ' +

        '<td style=" text-align: center;">' + data.nature_of_mentoringl_phd + '</td> ' +

        '</tr>' +
        '</tbody></table></div>';
    content_research += goalDetailsResearch(reportdata);

    achievementdata = [];
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



    content_research += printTopAchievements(achievementdata);
    content_research += '<br><br>';
    content_research += addListOfContacts(data);

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
    data["unit"] = reportdata.Unit;

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

    addData9 = { 1: data["federalApplication"], 2: data["stateApplication"], 3: data["privateApplication"] };

    data["proposal_total"] = add(addData9);
    data["awards"] = reportdata.Q52;
    data["federalAwards"] = checkNull(reportdata.awards1);
    data["stateAwards"] = checkNull(reportdata.awards2);
    data["privateAwards"] = checkNull(reportdata.awards3);
    addData11 = { 1: data["federalAwards"], 2: data["stateAwards"], 3: data["privateAwards"] };

    data["awrds_total"] = add(addData11);

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
        '<tr><th class="border_right padding_bottom padding_top">State Application</th><td style=" text-align: center;">' +
        data.stateApplication + '</td></tr>' +
        '<tr><th class="border_right padding_bottom padding_top">Private Application</th><td style=" text-align: center;">' +
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

let checkNull = function (value) {

    if (typeof value === "undefined" || value === "") {
        return 'N/A';
    }
    else {
        return value;
    }
}

let add = function (value) {
    var sum = 0;

    for (var i = 1; i <= Object.keys(value).length; i++) {

        sum += value[i];
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

let addListOfContacts = function (data) {
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
    for (var i = 7; i < 12; i++) {

        let goal = new GoalPlan(i - 6, reportdata["Q" + i + "1"], reportdata["Q" + i + "2"],
            reportdata["Q" + i + "3"], reportdata["Q" + i + "4"], reportdata["Q" + i + "5"],
            reportdata["Q" + i + "6"], reportdata["Q" + i + "7"], reportdata["Q" + i + "8"]);
        content += printSmartGoalPlan(goal, year);
    }
    return content;
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

let printTopAchievements = function (data) {
    let achievements = '<div class="achievements">' +
        '<p><br><b>TOP 3 ACHIEVEMENTS:</b></p>';
    for (var i = 0; i < data.length; i++) {
        achievements += '<p><b>Achievement ' + (i + 1) + ': </b><p>';
        achievements += formatText(data[i]);
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