import I18n from '@configs/language';
import RNFetchBlob from 'rn-fetch-blob';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from 'moment';
import { Alert } from 'react-native';
const FORMAT_DATE = 'DD/MM/YYYY - hh:mm';
interface ReturnType {
  filePath?: String;
  error?: string;
}

export const exportDataToCSV = async (
  data: Array<any>,
): Promise<ReturnType> => {
  const result = {
    error: '',
    filePath: '',
  };
  if (!data || !data.length) {
    result.error = I18n.t('list_empty');
    return result;
  }
  try {
    const fs = RNFetchBlob.fs;
    const { DocumentDir } = fs.dirs;

    const _data = data
      .map((transaction) => Object.values(transaction).join(','))
      .join(';');
    const filePath = `${DocumentDir}/TransactionHistory${Date.now()}.csv`;

    const isDir = await fs.isDir(DocumentDir);
    if (!isDir) {
      await fs.mkdir(DocumentDir);
    }
    await fs.createFile(filePath, _data, 'utf8');
    result.filePath = filePath;
    return result;
  } catch (error) {
    result.error = error;
    return result;
  }
};

export const exportDataToPDF = async (
  data: Array<any>,
): Promise<ReturnType> => {

  const result: ReturnType = {
    filePath: '',
    error: ''
  }
  if (!data || !data.length) {
    result.error = I18n.t('list_empty');
    return result;
  }

  let listTransaction = '';
  data.forEach((transaction) => {
    let ammount =
      transaction.amount;
    ammount = ammount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    const timesttamp = moment(transaction.timestampt).format(FORMAT_DATE);
    const currentcy =
      transaction.currency

    listTransaction += `
      <div class="rows">
        <div class="left">
          <sean class="date">${timesttamp}</sean>
          <br />
          <sean class="transaction-id">${transaction.transactionId}</sean>
          <br />
          <span class="sender">${transaction.name}<span>
        </div>
        <div class="padding"></div>
        <div class="right">
          <span class="padding-bottom ammount ${ammount < 0 ? 'sending' : 'recive'}">
           ${ammount} ${currentcy}
          </span>
          <br />
          <span class="ammount ${transaction.amountP < 0 ? 'sending' : 'recive'}">
           (${transaction.amountP} ${transaction.currencyP})
          </span>
        </div>
      </div>
     `;
  });

  const options = {
    html: htmlGenerator(listTransaction),
    fileName: 'TransactionHistory_' + Date.now(),
    directory: 'Documents',
  };
  try {
    const file = await RNHTMLtoPDF.convert(options);
    result.filePath = file.filePath
    return result
  } catch (error) {
    result.error = error
    return error
  }
};

function htmlGenerator(transactionList: string) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Transaction History</title>
    <style>
      .rows {
        display: flex;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #999;
        margin-bottom: 8px;
        /* background-color: red; */
      }
      .date {
        color: grey;
        font-size: 10px;
      }
      .padding-bottom {
        padding-bottom: 12px;
      }
      .transaction-id {
        color: black;
        font-size: 10px;
      }
      .sender {
        color: #000;
        font-size: 14px;
      }
      .right {
        display: block;
        justify-content: center;
        align-items: center;
      }
      span {
        display: block;
      }
      .padding {
        width: 100px;
      }
      .ammount {
        font-size: 14px;
        float: right;
      }
      .ammount.recive {
        color: #0083db;
      }
      .ammount.sending {
        color: #c02ad1;
      }
      .container {
        display: flex;
        flex:1;
        flex-direction: column;
        padding: 0 100px;
      }
      h3{
        align-self: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h3>Transaction history</h3>
      ${transactionList}
    </div>
  </body>
</html>
`;
}
