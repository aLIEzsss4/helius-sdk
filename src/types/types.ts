import type { TransactionError } from "@solana/web3.js";

import type {
  WebhookType,
  TokenStandard,
  TransactionType,
  Source,
  ProgramName,
  TransactionContext,
  TxnStatus,
  AccountWebhookEncoding,
} from "./enums";

export type HeliusOptions = {
  limit?: number;
  paginationToken?: string;
};

export interface Webhook {
  webhookID: string;
  wallet: string;
  project: string;
  webhookURL: string;
  transactionTypes: string[];
  accountAddresses: string[];
  accountAddressOwners?: string[];
  webhookType?: WebhookType;
  authHeader?: string;
  txnStatus?: TxnStatus;
  encoding?: AccountWebhookEncoding;
}
// Enhanced and Account webhook response
export interface EnhancedWebhookResponse {
  accountData: AccountData[];
  description: string;
  events: Event;
  fee: number;
  feePayer: string;
  instructions: Instruction[];
  nativeTransfers: NativeTransfer[] | null;
  signature: string;
  slot: number;
  source: string;
  timestamp: number;
  tokenTransfers: TokenTransfer[];
  transactionError: TransactionError | null;
  type: string;
}
// Raw Webhook Response. 
export interface RawWebhookResponse {
  blockTime: number;
  indexWithinBlock: number;
  meta: {
    err: null | string;
    fee: number;
    innerInstructions: {
      index: number;
      instructions: {
        accounts: number[];
        data: string;
        programIdIndex: number;
      }[];
    }[];
    loadedAddresses: {
      readonly: string[];
      writable: string[];
    };
    logMessages: string[];
    postBalances: number[];
    postTokenBalances: {
      accountIndex: number;
      mint: string;
      owner: string;
      programId: string;
      uiTokenAmount: {
        amount: string;
        decimals: number;
        uiAmount: number;
        uiAmountString: string;
      };
    }[];
    preBalances: number[];
    preTokenBalances: any[];
    rewards: any[]; 
  };
  slot: number;
  transaction: {
    message: {
      accountKeys: string[];
      addressTableLookups: null | any;
      header: {
        numReadonlySignedAccounts: number;
        numReadonlyUnsignedAccounts: number;
        numRequiredSignatures: number;
      };
      instructions: {
        accounts: number[];
        data: string;
        programIdIndex: number;
      }[];
      recentBlockhash: string;
    };
    signatures: string[];
  };
  version: string;
}

export type CollectionIdentifier = {
  firstVerifiedCreators?: string[];
  verifiedCollectionAddresses?: string[];
};
export interface MintCNFTResponse { 
  signature: string;
}
export type CreateWebhookRequest = Omit<Webhook, "webhookID" | "wallet" | "project">;
export type EditWebhookRequest = Partial<Omit<Webhook, "webhookID" | "wallet" | "project">>;


export interface CreateCollectionWebhookRequest extends CreateWebhookRequest {
  collectionQuery: CollectionIdentifier;
}

export interface MintlistResponse {
  result: MintlistItem[];
  paginationToken: string;
}

export type MintlistRequest = {
  query: CollectionIdentifier;
  options?: HeliusOptions;
};

export interface MintlistItem {
  mint: string;
  name: string;
}

export interface RawTokenAmount {
  tokenAmount: string;
  decimals: number;
}

export interface TokenBalanceChange {
  userAccount: string;
  tokenAccount: string;
  rawTokenAmount: RawTokenAmount;
  mint: string;
}

export interface AccountData {
  account: string;
  nativeBalanceChange: number;
  tokenBalanceChanges: TokenBalanceChange[] | null;
}

export interface TokenTransfer {
  fromUserAccount: string | null;
  toUserAccount: string | null;
  fromTokenAccount: string | null;
  toTokenAccount: string | null;
  tokenAmount: number;
  decimals: number;
  tokenStandard: TokenStandard;
  mint: string;
}

export interface NativeBalanceChange {
  account: string;
  amount: number;
}

export interface NativeTransfer {
  fromUserAccount: string | null;
  toUserAccount: string | null;
  amount: number;
}

export type Instruction = {
  accounts: string[];
  data: string;
  programId: string;
  innerInstructions: InnerInstruction[];
};

export type InnerInstruction = {
  accounts: string[];
  data: string;
  programId: string;
};

export interface ProgramInfo {
  source: Source;
  account: string;
  programName: ProgramName;
  instructionName: string;
}

export interface TokenSwap {
  nativeInput: NativeTransfer | null;
  nativeOutput: NativeTransfer | null;
  tokenInputs: TokenTransfer[];
  tokenOutputs: TokenTransfer[];
  tokenFees: TokenTransfer[];
  nativeFees: NativeTransfer[];
  programInfo: ProgramInfo;
}

export interface SwapEvent {
  nativeInput: NativeBalanceChange;
  nativeOutput: NativeBalanceChange;
  tokenInputs: TokenBalanceChange[];
  tokenOutputs: TokenBalanceChange[];
  tokenFees: TokenBalanceChange[];
  nativeFees: NativeBalanceChange[];
  innerSwaps: TokenSwap[];
}

export interface CompressedNftEvent {
  type: TransactionType;
  treeId: string;
  leafIndex: number | null;
  seq: number | null;
  assetId: string | null;
  instructionIndex: number | null;
  innerInstructionIndex: number | null;
  newLeafOwner: string | null;
  oldLeafOwner: string | null;
  newLeafDelegate: string | null;
  oldLeafDelegate: string | null;
  treeDelegate: string | null;
}

export interface Token {
  mint: string;
  tokenStandard: TokenStandard;
}

export interface NFTEvent {
  seller: string;
  buyer: string;
  timestamp: number;
  amount: number;
  fee: number;
  signature: string;
  source: Source;
  type: TransactionType;
  saleType?: TransactionContext;
  nfts: Token[];
}

export interface TransactionEvent {
  nft: NFTEvent | null;
  swap: SwapEvent | null;
  compressed: CompressedNftEvent | null;
}

export interface EnrichedTransaction {
  description: string;
  type: TransactionType;
  source: Source;
  fee: number;
  feePayer: string;
  signature: string;
  slot: number;
  timestamp: number;
  nativeTransfers: NativeTransfer[] | null;
  tokenTransfers: TokenTransfer[] | null;
  accountData: AccountData[];
  transactionError: TransactionError | null;
  instructions: Instruction[];
  events: TransactionEvent;
}

// Compressed Types for Mint
export type RequiredMetadataArgs = { 
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints?: number | null;
  creators?: [] | null;
  collection?: [] | null;
}
export type MetadataArgs = {
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: number;
  tokenStandard: null;
  uses: null;
  tokenProgramVersion: null;
};
export interface MintCNFTResponse {
  creator: string;
  collectionName: string;
  collectionUri: string;
  collectionSymbol: string;
  collectionMint: string;
  treeId: string;
  treeKeypair: any,
  signature: string;
}
