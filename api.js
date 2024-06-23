import axios from 'axios';
import { Platform } from 'react-native';

// Enums for TransactionType and TransactionStatus
const TransactionType = {
  DATA_TRANSACTION: 'DataTransaction',
  AIRTIME_TRANSACTION: 'AirtimeTransaction',
  WALLET_TRANSACTION: 'WalletTransaction',
  CABLE_TRANSACTION: 'CableTransaction',
  ELECTRICITY_TRANSACTION: 'ElectricityTransaction',
};

const TransactionStatus = {
  PENDING: { value: 'PENDING', color: 'amber' },
  SUCCESSFUL: { value: 'SUCCESSFUL', color: 'green' },
  REFUNDED: { value: 'REFUNDED', color: 'green' },
  FAILED: { value: 'FAILED', color: 'red' },
  UNKNOWN: { value: 'UNKNOWN', color: 'red' },
};

// AirtimeTransaction class
class AirtimeTransaction {
  constructor({ id, phoneNumber, mobileNetworkId, amount = '0', network }) {
    this.id = id;
    this.phoneNumber = phoneNumber;
    this.mobileNetworkId = mobileNetworkId;
    this.amount = amount;
    this.network = network;
  }

  static fromJson(json) {
    return new AirtimeTransaction({
      id: json.id,
      phoneNumber: json.phoneNumber,
      mobileNetworkId: json.mobileNetworkId,
      amount: json.amount ?? '0',
      network: MobileNetwork.fromJson(json.network),
    });
  }
}

// CableNetwork and CableSubscriptionPlan classes
class CableNetwork {
  constructor({ id, name, code, plans, active }) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.plans = plans.map((plan) => CableSubscriptionPlan.fromJson(plan));
    this.active = active;
  }

  static fromJson(json) {
    return new CableNetwork({
      id: json.id,
      name: json.name,
      code: json.code,
      plans: json.plans.map((plan) => CableSubscriptionPlan.fromJson(plan)),
      active: json.active,
    });
  }
}

class CableSubscriptionPlan {
  constructor({
    id,
    cableNetworkId,
    productCode,
    packageName,
    validity,
    amount,
    active,
  }) {
    this.id = id;
    this.cableNetworkId = cableNetworkId;
    this.productCode = productCode;
    this.packageName = packageName;
    this.validity = validity;
    this.amount = amount;
    this.active = active;
  }

  static fromJson(json) {
    return new CableSubscriptionPlan({
      id: json.id,
      cableNetworkId: json.cableNetworkId,
      productCode: json.productCode,
      packageName: json.packageName,
      validity: json.validity,
      amount: json.amount,
      active: json.active,
    });
  }
}

// DataTransaction and ElectricityBillTransaction classes
class DataTransaction {
  constructor({
    id,
    mobileNetworkId,
    dataPlanId,
    phoneNumber,
    description,
    plan,
    network,
  }) {
    this.id = id;
    this.mobileNetworkId = mobileNetworkId;
    this.dataPlanId = dataPlanId;
    this.phoneNumber = phoneNumber;
    this.description = description;
    this.plan = plan;
    this.network = network;
  }

  static fromJson(json) {
    return new DataTransaction({
      id: json.id,
      mobileNetworkId: json.mobileNetworkId,
      dataPlanId: json.dataPlanId,
      phoneNumber: json.phoneNumber,
      description: json.description,
      plan: DataPlan.fromJson(json.plan),
      network: MobileNetwork.fromJson(json.network),
    });
  }
}

class ElectricityBillTransaction {
  constructor({
    meterNumber,
    electricityDistributorId,
    meterType,
    name,
    address,
    phoneNumber,
    token,
  }) {
    this.meterNumber = meterNumber;
    this.electricityDistributorId = electricityDistributorId;
    this.meterType = meterType;
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.token = token;
  }

  static fromJson(json) {
    return new ElectricityBillTransaction({
      meterNumber: json.meterNumber,
      electricityDistributorId: json.electricityDistributorId,
      meterType: json.meterType,
      name: json.name,
      address: json.address,
      phoneNumber: json.phoneNumber,
      token: json.token,
    });
  }
}

// Wallet and WalletTransaction classes
class Wallet {
  constructor({ id, userId, balance, bonusBalance, active }) {
    this.id = id;
    this.userId = userId;
    this.balance = balance;
    this.bonusBalance = bonusBalance;
    this.active = active;
  }

  static fromJson(json) {
    return new Wallet({
      id: json.id,
      userId: json.userId,
      balance: json.balance,
      bonusBalance: json.bonusBalance,
      active: json.active,
    });
  }
}

class WalletTransaction {
  constructor({
    id,
    userId,
    walletId,
    type,
    note,
    amount,
    method,
    transaction,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.userId = userId;
    this.walletId = walletId;
    this.type = type;
    this.note = note;
    this.amount = amount;
    this.method = method;
    this.transaction = transaction;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json) {
    return new WalletTransaction({
      id: json.id,
      userId: json.userId,
      walletId: json.walletId,
      type: json.type,
      note: json.note,
      amount: json.amount,
      method: json.method,
      transaction: Transaction.fromJson(json.transaction),
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    });
  }
}

// MobileNetwork and DataPlan classes
class MobileNetwork {
  constructor({
    id,
    name,
    code,
    createdAt,
    updatedAt,
    planTypes = [],
    dataActive,
    airtimeActive,
  }) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.planTypes = planTypes.map((type) => PlanType.fromJson(type));
    this.dataActive = dataActive;
    this.airtimeActive = airtimeActive;
  }

  static fromJson(json) {
    return new MobileNetwork({
      id: json.id,
      name: json.name,
      code: json.code,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
      planTypes: json.planTypes?.map((type) => PlanType.fromJson(type)) ?? [],
      dataActive: json.dataActive,
      airtimeActive: json.airtimeActive,
    });
  }
}

class PlanType {
  constructor({ id, name, code, mobileNetworkId, active }) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.mobileNetworkId = mobileNetworkId;
    this.active = active;
  }

  static fromJson(json) {
    return new PlanType({
      id: json.id,
      name: json.name,
      code: json.code,
      mobileNetworkId: json.mobileNetworkId,
      active: json.active,
    });
  }
}

// Example usage of making a POST request with Axios
async function makeTransaction() {
  const airtimeTransaction = new AirtimeTransaction({
    id: 1,
    phoneNumber: '1234567890',
    mobileNetworkId: 1,
    amount: '500',
    network: { id: 1, name: 'NetworkName', code: 'NET' }
  });

  try {
    const response = await axios.post('https://api.example.com/airtime/transactions', airtimeTransaction);
    console.log('Transaction successful:', response.data);
  } catch (error) {
    console.error('Error making transaction:', error);
  }
}

// Call the function to initiate the transaction
makeTransaction();

export {
  AirtimeTransaction,
  CableNetwork,
  CableSubscriptionPlan,
  DataTransaction,
  ElectricityBillTransaction,
  Wallet,
  WalletTransaction,
  MobileNetwork,
  PlanType,
  TransactionType,
  TransactionStatus,
};
