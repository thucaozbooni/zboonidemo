import I18n from '@configs/language';
import { settingFactory } from '@configs/SettingFactory';
import { colors } from '@common/styles/themes';

const euArr = ['Austria', 'Belgium', 'Bulgaria', 'Croatia',
  'Cyprus', 'Czech Republic', 'Denmark', 'Estonia',
  'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy',
  'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal',
  'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', "Switzerland", "Norway", "United Kingdom"]

const validateEmail = (text: string) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // check no chart '+' : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (reg.test(text)) {
    // console.log("Email is Correct");
    return null;
  }
  // console.log("Email is Not Correct");
  return I18n.t('Email_Not_Correct');
};

const handleConfirmPassword = (oldPass:string, newPass:string) => {
  if (oldPass === newPass) {
    return true;
  }
  return false;
};

const validatePassword = (pass:string) => {
  if (pass.length === 0) {
    return I18n.t('Password_error');
  }
  if (pass.length < 6) {
    return I18n.t('Password_Error_Characters');
  }
  return '';
};

const validatePhoneNumber = (text: string): boolean => {
  return true;
};

const convertRate = (code: string): number => {
  const rateCurrencie = settingFactory.rates;
  if (code.includes('USD')) {
    return rateCurrencie[`${code}`];
  } else if (code.trim().length === 6) {
    const rateInput = `${code.slice(0, 3)}USD`;
    const rateOutput = `USD${code.slice(3)}`;
    return rateCurrencie[`${rateInput}`] * rateCurrencie[`${rateOutput}`];
  }
  return 1;
};

const statusColor = (status: string): string => {
  if (status === 'pending') {
    return colors.yellow
  }
  if (status === 'accepted') {
    return colors.green
  }
  return colors.red
};

const checkEU = (country: string) => {
  const upperCasedArray = euArr.map((e)=> e.toLocaleUpperCase());
  if (upperCasedArray.includes(country.toLocaleUpperCase())) {
    return true;
  }
  return false;
}

export { validateEmail, handleConfirmPassword, validatePassword, validatePhoneNumber, convertRate, statusColor, checkEU };
