const {
    gaapIdentifiers,
    filings,
    companies,
    facts,
} = require('../models');
const { logs, errors } = require('./logging');

module.exports.getFilingsGaapIdentifierCoverage = async (ticker, filingType, threshold) => {
    console.log({ ticker, filingType, threshold });
    const company = await companies.model.findOne({ ticker });

    // get all unique identifiers
    const uniqueGaapIdentifiers = await gaapIdentifiers.model.find({ 
        documentation: { $exists: true },
    }, { 
        name: 1,
        _id: 1, 
        documentation: 1,
    }).distinct('name');

    // find all filings by company and type
    // with a taxonomy extension
    let companyFilings = await filings.model.find({ 
        company: company._id, 
        type: filingType,
        'taxonomyExtensions.0': { $exists: true }
    }).populate({ path: 'taxonomyExtensions' });
    companyFilings = companyFilings.filter(f => f.taxonomyExtensions.length > 0);

    let filingsIdentifiers = {};
    for (let filing in companyFilings) {
        filing = companyFilings[filing];

        let filingFacts = await facts.model.find({ filing }, { 'identifiers.gaapIdentifierName': 1 });
        filingFacts = filingFacts.map(f => f.identifiers.gaapIdentifierName);

        filingsIdentifiers[filing._id] = filingFacts;
    }

    const coverage = {};
    uniqueGaapIdentifiers.forEach((identifier) => {
        const numberFound = Object.keys(filingsIdentifiers).filter(filing => filingsIdentifiers[filing].includes(identifier)).length;
        const percentageCoverage = (numberFound / companyFilings.length) * 100;

        if (numberFound !== 0 && Math.round(percentageCoverage) >= threshold) {
            coverage[identifier] = percentageCoverage;
        }
    })

    return {
        company,
        coverage: {
            threshold,
            filings: {
                count: companyFilings.length,
                ids: companyFilings.map(f => f._id),
            },
            identifiers: coverage,
        },
    };
}