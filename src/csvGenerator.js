const { faker } = require('@faker-js/faker');
const fs = require('fs');
const { stringify } = require('csv-stringify');

const filePath = './assets/large_file.csv';
const writableStream = fs.createWriteStream(filePath);

const csvStream = stringify({
  header: true,
  columns: ['id', 'company', 'reportId', 'amount', 'img'],
});

csvStream.pipe(writableStream);

const AllowedCompanies = ['Company A', 'Company B', 'Company C'];

const generateRow = () => {
  const shouldCreateImg = faker.datatype.boolean({probability: 0.9});
  const shouldPickRightCompany = faker.datatype.boolean({probability: 0.9})

  const company =
    shouldPickRightCompany
      ? faker.helpers.arrayElement(AllowedCompanies)
      : faker.helpers.arrayElement(['Company D', 'Company E']);


  return [
    faker.string.uuid(),
    company,
    faker.number.int({ min: 0, max: 1000 }),
    faker.number.int({ min: 0, max: 100000 }),
    shouldCreateImg? faker.internet.url() : undefined,
  ];
};

const TOTAL_SIZE_BYTES = 5 * 1024 * 1024 * 1024; // 5GB
let writtenSize = 0;

function writeData() {
  let canContinue = true;
  while (canContinue && writtenSize < TOTAL_SIZE_BYTES) {
    const row = generateRow();
    const rowString = row.join(',') + '\n';
    writtenSize += Buffer.byteLength(rowString);

    canContinue = csvStream.write(row);
  }

  if (writtenSize >= TOTAL_SIZE_BYTES) {
    csvStream.end();
    console.log('✅ Done');
  } else {
    csvStream.once('drain', writeData);
  }
}

writeData();
