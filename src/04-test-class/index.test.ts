import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const cash = 45;
    const bankAccount = getBankAccount(cash);
    expect(bankAccount.getBalance()).toEqual(cash);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const cash = 45;
    const bankAccount = getBankAccount(cash);

    expect(() => bankAccount.withdraw(cash + 10)).toThrow(
      `Insufficient funds: cannot withdraw more than ${cash}`,
    );
    expect(() => bankAccount.withdraw(cash + 10)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const cash = 45;
    const bankAccount = getBankAccount(cash);
    const sameBankAccount = getBankAccount(59);
    expect(() => bankAccount.transfer(cash + 10, sameBankAccount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${cash}`,
    );
    expect(() => bankAccount.transfer(cash + 10, sameBankAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const cash = 45;
    const bankAccount = getBankAccount(cash);

    expect(() => bankAccount.transfer(cash, bankAccount)).toThrow(
      'Transfer failed',
    );
    expect(() => bankAccount.transfer(cash, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(45);
    const balance = bankAccount.getBalance();
    bankAccount.deposit(20);
    const newBalance = bankAccount.getBalance();
    expect(newBalance).toEqual(balance + 20);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(45);
    const balance = bankAccount.getBalance();
    bankAccount.withdraw(20);
    const newBalance = bankAccount.getBalance();
    expect(newBalance).toEqual(balance - 20);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(45);
    const sameBankAccount = getBankAccount(25);

    const balanceOfBankAccount = bankAccount.getBalance();
    const balanceOfSameBankAccount = sameBankAccount.getBalance();

    bankAccount.transfer(20, sameBankAccount);

    const newBalanceOfBankAccount = bankAccount.getBalance();
    const newBalanceOfSameBankAccount = sameBankAccount.getBalance();

    expect(newBalanceOfBankAccount).toEqual(balanceOfBankAccount - 20);
    expect(newBalanceOfSameBankAccount).toEqual(balanceOfSameBankAccount + 20);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(45);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(20);

    await expect(bankAccount.synchronizeBalance()).resolves.not.toThrow(
      SynchronizationFailedError,
    );
    jest.restoreAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(45);
    const value = 20;
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(value);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toEqual(value);
    jest.restoreAllMocks();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(45);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    jest.restoreAllMocks();
  });
});
