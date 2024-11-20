import lodash from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER = 'USER';

export const saveUserByWallet = (walletID : string, value: string) => {
  if (!lodash.isNull(walletID) && !lodash.isUndefined(walletID)) {
    AsyncStorage.setItem(USER + walletID, value, (err) => {
      if (err) {
        // tslint:disable-next-line:no-console
        console.log('Error save wallet: ', err);
      }
    });
  }
};

export const getUserByWallet = (walletID) => {
  if (!lodash.isNull(walletID) && !lodash.isUndefined(walletID)) {
    return new Promise((resolve, reject) =>
      AsyncStorage.getItem(USER + walletID)
        .then((req) => resolve(JSON.parse(req)))
        .catch((error) => reject(error)),
    );
  }
};