
function printAdminAssessment(reportdata, year1, year2) {
    let data = {};
    data["unit"] = reportdata["ExternalReference"];

    if (year1 == '2019') {
        data["mission"] = reportdata["1819Mission"];
        data["vision"] = reportdata["1819Vision"];
    }
    else {
        data["mission"] = reportdata.Q31;
        data["vision"] = reportdata.Q32;
    }

    data["annualBudget"] = reportdata.Q41;
    data["employeesState"] = reportdata.Q42_1_1;
    data["employeesRF"] = reportdata.Q42_1_2;
    data["fteState"] = reportdata.Q42_2_1;
    data["fteRF"] = reportdata.Q42_2_2;
    let content = '';
    content = '<h1 style="text-align: center;">' + data.unit + '</h1><div style="margin-botton:30px;"></div><h1 style="text-align: center;">Annual Assessment Report (' + year1 + '-' + year2 + ')</h1>' +
        '<div style="margin-botton:30px;"></div><h3 style="text-align: center;">Director: ' + reportdata.RecipientFirstName + ' ' + reportdata.RecipientLastName + '</h3>' +
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
    if (reportdata.Q51 == 'Yes') {

        for (var i = 1; i < 7; i++) {
            data['membership' + i] = reportdata["Q52_" + i];
            data['benefit' + i] = reportdata["Q61_" + i];

        }
        content += printOrganizationalMemberships(data);
    }

    for (var i = 8; i < 13; i++) {
        if (i > 10 && reportdata.Q105 === 'No') {
            break;
        }
        let no = i - 7;
        if (year1 == 2019) {
            let goal = new Goal(no, reportdata["1819Goal" + no], reportdata["1819Activities" + no],
                reportdata["1819Metrics" + no], reportdata["1819Timeframe" + no], reportdata["Q" + i + "2"], reportdata["Q" + i + "3"], reportdata["Q" + i + "4"]);
            content += printSmartGoal(goal, year1);
        }
        else {
            let goal = new Goal(no, reportdata["Q" + i + "1"], reportdata["Q" + i + "2"],
                reportdata["Q" + i + "3"], reportdata["Q" + i + "4"], reportdata["Q" + i + "5"], reportdata["Q" + i + "6"], reportdata["Q" + i + "7"]);
            content += printSmartGoal(goal, year1);
        }
    }

    data = [];
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
    content += printTopAchievements(data);

    data["opportunities"] = reportdata.Q141;
    data["challenges"] = reportdata.Q142;
    data["needs"] = reportdata.Q143;
    data["strategies"] = reportdata.Q144;
    data["suggestions"] = reportdata.Q145;
    content += printOtherThoughts(data);
    return content;
}

function printAdminPlanning(reportdata, year1, year2) {
    let data = {};
    data["unit"] = reportdata.ExternalReference
    let content = '';
    data["mission"] = reportdata.Q31;
    data["vision"] = reportdata.Q32;
    data["annualBudget"] = reportdata.Q41;
    data["employeesState"] = reportdata.Q42_1_1;
    data["employeesRF"] = reportdata.Q42_1_2;
    data["fteState"] = reportdata.Q42_2_1;
    data["fteRF"] = reportdata.Q42_2_2;


    content = '<h1 style="text-align: center;">' + data.unit + '</h1><div style="margin-botton:30px;"></div><h1 style="text-align: center;">Planning Report (' + year1 + '-' + year2 + ')</h1>' +
        '<div style="margin-botton:30px;"></div><h3 style="text-align: center;">Director: ' + reportdata.RecipientFirstName + ' ' + reportdata.RecipientLastName + '</h3>' +
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

    data["unit"] = reportdata.ExternalReference;

    data["mission"] = reportdata.Q31;
    data["vision"] = reportdata.Q32;

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
    //detailed research

    data["publications"] = checkNull(reportdata.Q61);
    data["booksAuthoredgoals"] = checkNull(reportdata.Q61_1_1);
    data["bookauthoredsactual"] = checkNull(reportdata.Q61_1_2);

    data["bookschaptersgoals"] = checkNull(reportdata.Q61_2_1);
    data["bookschapteractual"] = checkNull(reportdata.Q61_2_2);

    data["publicationsgoals"] = checkNull(reportdata.Q61_3_1);
    data["publicationsactual"] = checkNull(reportdata.Q61_3_2);
    data["listofpublications"] = checkNull(reportdata.Q62);

    data["intellctualgoals"] = checkNull(reportdata.Q63_1_1);
    data["intellctualactual"] = checkNull(reportdata.Q63_1_2);

    data["patnetsgoals"] = checkNull(reportdata.Q63_2_1);
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
    data["noofpartners"] = reportdata.Q141;
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

        '<div style="margin-botton:30px;"></div><h3 style="text-align: center;">Director: ' + reportdata.RecipientFirstName + ' ' + reportdata.RecipientLastName + '</h3>' +
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
    if (year1 == 2019) {
        if (reportdata.Q81_4 != '')
            achievementdata.push(reportdata.Q81_4);
        else
            achievementdata.push("N/A");
        if (reportdata.Q81_5 != '')
            achievementdata.push(reportdata.Q81_5);
        else
            achievementdata.push("N/A");
        if (reportdata.Q81_6 != '')
            achievementdata.push(reportdata.Q81_6);
        else
            achievementdata.push("N/A");
    }
    else {
        if (reportdata.Q81_4 != '')
            achievementdata.push(reportdata.Q81_4);
        else
            achievementdata.push("N/A");
        if (reportdata.Q81_5 != '')
            achievementdata.push(reportdata.Q81_5);
        else
            achievementdata.push("N/A");
        if (reportdata.Q81_6 != '')
            achievementdata.push(reportdata.Q81_6);
        else
            achievementdata.push("N/A");
        if (reportdata.Q81_7 != '')
            achievementdata.push(reportdata.Q81_7);
        else
            achievementdata.push("N/A");
        if (reportdata.Q81_8 != '')
            achievementdata.push(reportdata.Q81_8);
        else
            achievementdata.push("N/A");
    }


    content_research += printTopAchievements(achievementdata);
    content_research += '<br><br>';
    content_research += addListOfContacts(data);

    otherdata = {};
    otherdata["opportunities"] = reportdata.Q151;
    otherdata["challenges"] = reportdata.Q152;
    otherdata["needs"] = reportdata.Q153;
    otherdata["strategies"] = reportdata.Q154;
    otherdata["suggestions"] = reportdata.Q155;
    content_research += printOtherThoughts(otherdata);

    return content_research;
}

function printResearchPlanning(reportdata, year1, year2) {
    let data = {};
    data["unit"] = reportdata.ExternalReference;

    data["mission"] = reportdata.Q31;
    data["vision"] = reportdata.Q32;
    //  content += addMissionAndVision(ids, data);
    data["annualBudget"] = reportdata.Q41;
    data["employeesState"] = checkNull(reportdata.Q42_1_1);
    data["employeesRF"] = checkNull(reportdata.Q42_1_2);
    data["fteState"] = checkNull(reportdata.Q42_2_1);
    data["fteRF"] = checkNull(reportdata.Q42_2_2);
    // content += addAnnualBudget(ids, data);
    data["proposals"] = reportdata.Q51;
    data["federalApplication"] = checkNull(reportdata.Q51_1_1);
    data["stateApplication"] = checkNull(reportdata.Q51_1_2);
    data["privateApplication"] = checkNull(reportdata.Q51_1_4);

    addData9 = { 1: data["federalApplication"], 2: data["stateApplication"], 3: data["privateApplication"] };

    data["proposal_total"] = add(addData9);
    data["awards"] = reportdata.Q52;
    data["federalAwards"] = checkNull(reportdata.Q52_1_1);
    data["stateAwards"] = checkNull(reportdata.Q52_1_2);
    data["privateAwards"] = checkNull(reportdata.Q52_1_4);

    addData11 = { 1: data["federalAwards"], 2: data["stateAwards"], 3: data["privateAwards"] };

    data["awrds_total"] = add(addData11);

    data["largeScale"] = checkNull(reportdata.Q53);
    data["proposal"] = checkNull(reportdata.Q53_1_1);
    data["lsAwards"] = checkNull(reportdata.Q53_1_2);

    data["strr"] = checkNull(reportdata.Q54);
    data["stProposal"] = checkNull(reportdata.Q54_1_1);
    data["stAwards"] = checkNull(reportdata.Q54_1_2);

    data["publications"] = checkNull(reportdata.Q55);
    data["booksAuthored"] = checkNull(reportdata.Q55_1_1);
    data["booksChapters"] = checkNull(reportdata.Q55_1_2);
    data["publicationsTable"] = checkNull(reportdata.Q54_1_3);


    data["technologyTransfer"] = checkNull(reportdata.Q56);
    data["intellectual"] = checkNull(reportdata.Q56_1_1);
    data["patentsApplications"] = checkNull(reportdata.Q56_2_1);
    data["patentsIssued"] = checkNull(reportdata.Q56_3_1);
    data["patentsLicensed"] = checkNull(reportdata.Q56_4_1);
    data["licensedExecuted"] = checkNull(reportdata.Q56_5_1);
    data["licensedRevenue"] = checkNull(reportdata.Q56_6_1);
    data["startupCompanies"] = checkNull(reportdata.Q56_7_1);
    data["conference"] = checkNull(reportdata.Q57);
    data["goals"] = checkNull(reportdata.Q57_1_1);

    data["education"] = checkNull(reportdata.Q58);
    data["undergraduate"] = checkNull(reportdata.Q58_1_1);
    data["graduate_masters"] = checkNull(reportdata.Q58_2_1);
    data["graduate_phd"] = checkNull(reportdata.Q58_3_1);
    data["post"] = checkNull(reportdata.Q58_4_1);
    let period = getPeriod(year1);
    let content_research1 = '<h1 style="text-align: center;">' + data.unit + '</h1><div style="margin-botton:30px;"></div><h1 style="text-align: center;">Planning Report (' + year1 + '-' + year2 + ')</h1>';
    content_research1 +=
        '<div style="margin-botton:30px;"></div><h3 style="text-align: center;">Director: ' + reportdata.RecipientFirstName + ' ' + reportdata.RecipientLastName + '</h3>' +
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
    for (var i = 9; i < 14; i++) {
        let goal = new Goal(i - 8, reportdata["Q" + i + "1"], reportdata["Q" + i + "2"],
            reportdata["Q" + i + "3"], reportdata["Q" + i + "4"], reportdata["Q" + i + "5"],
            reportdata["Q" + i + "6"], reportdata["Q" + i + "7"], reportdata["Q" + i + "8"]);
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

    for (var i = 6; i < 11; i++) {
        let goal = new GoalPlan(i - 5, reportdata["Q" + i + "1"], reportdata["Q" + i + "2"],
            reportdata["Q" + i + "3"], reportdata["Q" + i + "4"], reportdata["Q" + i + "5"],
            reportdata["Q" + i + "6"], reportdata["Q" + i + "7"], reportdata["Q" + i + "8"]);
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