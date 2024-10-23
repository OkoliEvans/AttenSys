import { Account, CallData, Contract, RpcProvider, stark } from "starknet";
import * as dotenv from "dotenv";
import { getCompiledCode } from "./utils";
import fs from 'fs';
import path from 'path';
import prettier from "prettier";

dotenv.config();

const OUTPUT_FILE = path.join(__dirname, '../../attensysui/src/deployments/abi.ts');
const CONTRACT_OUTPUT_FILE = path.join(__dirname, '../../attensysui/src/deployments/contracts.ts');

const Comment = `/**
 * This file content is autogenerated at contract deployment.
 * You should not edit it manually or your changes might be overwritten.
 */`;

async function main() {
    fs.writeFileSync(OUTPUT_FILE, '');
    fs.writeFileSync(CONTRACT_OUTPUT_FILE, '');
    const provider = new RpcProvider({
        nodeUrl: process.env.RPC_ENDPOINT,
    });

    console.log("ACCOUNT_ADDRESS=", process.env.DEPLOYER_ADDRESS);
    const privateKey0 = process.env.DEPLOYER_PRIVATE_KEY ?? "";
    const accountAddress0: string = process.env.DEPLOYER_ADDRESS ?? "";
    const account0 = new Account(provider, accountAddress0, privateKey0);
    console.log("Account connected.\n");

  
     let AsierraCode, AcasmCode, BsierraCode, BcasmCode, CsierraCode, CcasmCode, DsierraCode, DcasmCode ;
    
     try {
        ({ AsierraCode, AcasmCode, BsierraCode, BcasmCode, CsierraCode, CcasmCode, DsierraCode, DcasmCode  } = await getCompiledCode(
        "attendsys_AttenSysCourse","attendsys_AttenSysEvent","attendsys_AttenSysOrg","attendsys_AttenSysNft"  
        ));
    } catch (error: any) {
        console.log("Failed to read contract files");
        console.log(error);
        process.exit(1);
    }
    const contract_owner = "0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691"

    console.log("deploying nft contract......\n")
    //for nft 
    const NftCallData = new CallData(DsierraCode.abi);
    const constructor_d = NftCallData.compile("constructor", {
        base_uri: "https://dummy_uri.com/your_id",
        name : "attensys",
        symbol : "ats",
    });
    
    const nftdeployResponse = await account0.declareAndDeploy({
        contract: DsierraCode,
        casm: DcasmCode,
        constructorCalldata: constructor_d,
        salt: stark.randomAddress(),
    });

    const nft_hash = nftdeployResponse.declare.class_hash
    
    console.log("deploying attensys course.....\n");
    
    
    //for course 
    const CourseCallData = new CallData(AsierraCode.abi);
    const constructor_a = CourseCallData.compile("constructor", {
        owner: contract_owner,
        _hash : nft_hash
    });

    const coursedeployResponse = await account0.declareAndDeploy({
        contract: AsierraCode,
        casm: AcasmCode,
        constructorCalldata: constructor_a,
        salt: stark.randomAddress(),
    });

       // Connect the new course contract instance :
       const AttensysCourseContract = new Contract(
        AsierraCode.abi,
        coursedeployResponse.deploy.contract_address,
        provider
    );

    console.log("deploying attensys event.....\n");
   //for event 
   const EventCallData = new CallData(BsierraCode.abi);
   const constructor_b = EventCallData.compile("constructor", {
       owner: contract_owner,
       _hash : nft_hash
   });

   const eventdeployResponse = await account0.declareAndDeploy({
       contract: BsierraCode,
       casm: BcasmCode,
       constructorCalldata: constructor_b,
       salt: stark.randomAddress(),
   });

      // Connect the new contract instance :
      const AttensysEventContract = new Contract(
        BsierraCode.abi,
        eventdeployResponse.deploy.contract_address,
       provider
   ); 

   console.log("deploying attensys org.....\n");
   //for org 
   const OrgCallData = new CallData(CsierraCode.abi);
   const constructor_c = OrgCallData.compile("constructor", {
       owner: contract_owner,
       class_hash : nft_hash
   });

   const orgdeployResponse = await account0.declareAndDeploy({
       contract: CsierraCode,
       casm: CcasmCode,
       constructorCalldata: constructor_c,
       salt: stark.randomAddress(),
   });

      // Connect the new contract instance :
      const AttensysOrgContract = new Contract(
        CsierraCode.abi,
        orgdeployResponse.deploy.contract_address,
       provider
   );
   
   
   
    console.log(
        `Attensys course deployed to address: ${AttensysCourseContract.address}`
    );
    console.log(
        `Attensys Event deployed to address: ${AttensysEventContract.address}`
    ); 
    console.log(
        `Attensys Org deployed to address: ${AttensysOrgContract.address}`
    );

    const abiFileContent = `${Comment}\n\n
    export const attensysCourseAbi = ${JSON.stringify(AttensysCourseContract.abi, null, 2)};  
    export const attensysEventAbi = ${JSON.stringify(AttensysEventContract.abi, null, 2)};   
    export const attensysOrgAbi = ${JSON.stringify(AttensysOrgContract.abi, null, 2)};
  `;

    const contracts = `${Comment}\n\n
    export const attensysCourseAddress = ${JSON.stringify(AttensysCourseContract.address, null, 2)};  
    export const attensysEventAddress = ${JSON.stringify(AttensysEventContract.address, null, 2)};   
    export const attensysOrgAddress = ${JSON.stringify(AttensysOrgContract.address, null, 2)};
    `;
    
  // Write to abi.ts
  const formattedAbiFileContent = await prettier.format(abiFileContent, { parser: 'typescript' });
  fs.writeFileSync(OUTPUT_FILE, formattedAbiFileContent);
  console.log(`✨✅ ABI file generated and saved at: ${OUTPUT_FILE}\n`);

  const formattedContractContent = await prettier.format(contracts, { parser: 'typescript' });
  fs.writeFileSync(CONTRACT_OUTPUT_FILE, formattedContractContent);
  console.log(`✨✅ Contract addresses generated and saved at: ${CONTRACT_OUTPUT_FILE}\n`);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });