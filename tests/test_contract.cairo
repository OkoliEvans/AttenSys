use starknet::{ContractAddress, contract_address_const, ClassHash};
// get_caller_address,
use snforge_std::{
    declare, ContractClassTrait, start_cheat_caller_address, start_cheat_block_timestamp_global
};


// use attendsys::AttenSys::IAttenSysSafeDispatcher;
// use attendsys::AttenSys::IAttenSysSafeDispatcherTrait;
use attendsys::contracts::AttenSysCourse::IAttenSysCourseDispatcher;
use attendsys::contracts::AttenSysCourse::IAttenSysCourseDispatcherTrait;

use attendsys::contracts::AttenSysEvent::IAttenSysEventDispatcher;
use attendsys::contracts::AttenSysEvent::IAttenSysEventDispatcherTrait;

use attendsys::contracts::AttenSysOrg::IAttenSysOrgDispatcher;
use attendsys::contracts::AttenSysOrg::IAttenSysOrgDispatcherTrait;


#[starknet::interface]
pub trait IERC721<TContractState> {
    fn balance_of(self: @TContractState, account: ContractAddress) -> u256;
    fn owner_of(self: @TContractState, token_id: u256) -> ContractAddress;
    fn safe_transfer_from(
        ref self: TContractState,
        from: ContractAddress,
        to: ContractAddress,
        token_id: u256,
        data: Span<felt252>
    );
    fn transfer_from(
        ref self: TContractState, from: ContractAddress, to: ContractAddress, token_id: u256
    );
    fn approve(ref self: TContractState, to: ContractAddress, token_id: u256);
    fn set_approval_for_all(ref self: TContractState, operator: ContractAddress, approved: bool);
    fn get_approved(self: @TContractState, token_id: u256) -> ContractAddress;
    fn is_approved_for_all(
        self: @TContractState, owner: ContractAddress, operator: ContractAddress
    ) -> bool;

    // IERC721Metadata
    fn name(self: @TContractState) -> ByteArray;
    fn symbol(self: @TContractState) -> ByteArray;
    fn token_uri(self: @TContractState, token_id: u256) -> ByteArray;

    // NFT contract
    fn mint(ref self: TContractState, recipient: ContractAddress, token_id: u256);
}


fn deploy_contract(name: ByteArray, hash: ClassHash) -> ContractAddress {
    let contract = declare(name).unwrap();
    let mut constuctor_arg = ArrayTrait::new();
    let contract_owner_address: ContractAddress = contract_address_const::<
        'contract_owner_address'
    >();

    contract_owner_address.serialize(ref constuctor_arg);
    hash.serialize(ref constuctor_arg);
    let (contract_address, _) = contract.deploy(@constuctor_arg).unwrap();
    contract_address
}

fn deploy_nft_contract(name: ByteArray) -> (ContractAddress, ClassHash) {
    let token_uri: ByteArray = "https://dummy_uri.com/your_id";
    let name_: ByteArray = "Attensys";
    let symbol: ByteArray = "ATS";
    let mut constructor_calldata = ArrayTrait::new();

    token_uri.serialize(ref constructor_calldata);
    name_.serialize(ref constructor_calldata);
    symbol.serialize(ref constructor_calldata);

    let contract = declare(name).unwrap();
    let (contract_address, _) = contract.deploy(@constructor_calldata).unwrap();

    (contract_address, contract.class_hash)
}


#[test]
fn test_create_course() {
    let (_nft_contract_address, hash) = deploy_nft_contract("AttenSysNft");
    let contract_address = deploy_contract("AttenSysCourse", hash);
    let owner_address: ContractAddress = contract_address_const::<'owner'>();
    let owner_address_two: ContractAddress = contract_address_const::<'owner_two'>();

    let dispatcher = IAttenSysCourseDispatcher { contract_address };

    let token_uri_b: ByteArray = "https://dummy_uri.com/your_idb";
    let nft_name_b = "cairo";
    let nft_symb_b = "CAO";

    let token_uri_a: ByteArray = "https://dummy_uri.com/your_id";
    let nft_name_a = "cairo";
    let nft_symb_a = "CAO";
    start_cheat_caller_address(contract_address, owner_address);
    dispatcher.create_course(owner_address, true, token_uri_a, nft_name_a, nft_symb_a);
    dispatcher.create_course(owner_address, true, token_uri_b, nft_name_b, nft_symb_b);

    let token_uri: ByteArray = "https://dummy_uri.com/your_idS";
    let nft_name = "cairo";
    let nft_symb = "CAO";
    //call again
    start_cheat_caller_address(contract_address, owner_address_two);
    dispatcher.create_course(owner_address_two, true, token_uri, nft_name, nft_symb);
    let creator_courses = dispatcher.get_all_creator_courses(owner_address);
    let creator_courses_two = dispatcher.get_all_creator_courses(owner_address_two);
    let creator_info = dispatcher.get_creator_info(owner_address);

    let array_calldata = array![1, 2, 3];
    let course_info = dispatcher.get_course_infos(array_calldata);
    assert(creator_courses.len() == 2, 'wrong count');
    assert(creator_courses_two.len() == 1, 'wrong count');
    assert(*creator_courses.at(0).owner == owner_address, 'wrong owner');
    assert(*creator_courses.at(1).owner == owner_address, 'wrong owner');
    assert(*creator_courses_two.at(0).owner == owner_address_two, 'wrong owner');
    assert(creator_info.creator_status == true, 'failed not creator');
    assert(course_info.len() == 3, 'get course fail');
}

#[test]
fn test_finish_course_n_claim() {
    let (_nft_contract_address, hash) = deploy_nft_contract("AttenSysNft");
    let contract_address = deploy_contract("AttenSysCourse", hash);
    let owner_address: ContractAddress = contract_address_const::<'owner'>();
    let owner_address_two: ContractAddress = contract_address_const::<'owner_two'>();
    let viewer1_address: ContractAddress = contract_address_const::<'viewer1_address'>();
    let viewer2_address: ContractAddress = contract_address_const::<'viewer2_address'>();
    let viewer3_address: ContractAddress = contract_address_const::<'viewer3_address'>();

    let dispatcher = IAttenSysCourseDispatcher { contract_address };

    let token_uri_b: ByteArray = "https://dummy_uri.com/your_idb";
    let nft_name_b = "cairo_b";
    let nft_symb_b = "CAO";

    let token_uri_a: ByteArray = "https://dummy_uri.com/your_id";
    let nft_name_a = "cairo_a";
    let nft_symb_a = "CAO";
    start_cheat_caller_address(contract_address, owner_address);
    dispatcher.create_course(owner_address, true, token_uri_a, nft_name_a, nft_symb_a);
    dispatcher.create_course(owner_address, true, token_uri_b, nft_name_b, nft_symb_b);

    let token_uri: ByteArray = "https://dummy_uri.com/your_idS";
    let nft_name = "cairo_c";
    let nft_symb = "CAO";
    //call again
    start_cheat_caller_address(contract_address, owner_address_two);
    dispatcher.create_course(owner_address_two, true, token_uri, nft_name, nft_symb);

    start_cheat_caller_address(contract_address, viewer1_address);
    dispatcher.finish_course_claim_certification(1);
    start_cheat_caller_address(contract_address, viewer2_address);
    dispatcher.finish_course_claim_certification(2);
    start_cheat_caller_address(contract_address, viewer3_address);
    dispatcher.finish_course_claim_certification(3);

    let nftContract_a = dispatcher.get_course_nft_contract(1);
    let nftContract_b = dispatcher.get_course_nft_contract(2);
    let nftContract_c = dispatcher.get_course_nft_contract(3);

    let erc721_token_a = IERC721Dispatcher { contract_address: nftContract_a };
    let erc721_token_b = IERC721Dispatcher { contract_address: nftContract_b };
    let erc721_token_c = IERC721Dispatcher { contract_address: nftContract_c };

    let token_name_a = erc721_token_a.name();
    let token_name_b = erc721_token_b.name();
    let token_name_c = erc721_token_c.name();

    assert(erc721_token_a.owner_of(1) == viewer1_address, 'wrong 1 token id');
    assert(erc721_token_b.owner_of(1) == viewer2_address, 'wrong 2 token id');
    assert(erc721_token_c.owner_of(1) == viewer3_address, 'wrong 3 token id');
    assert(token_name_a == "cairo_a", 'wrong token a name');
    assert(token_name_b == "cairo_b", 'wrong token b name');
    assert(token_name_c == "cairo_c", 'wrong token name');
}

#[test]
fn test_add_replace_course_content() {
    let (_nft_contract_address, hash) = deploy_nft_contract("AttenSysNft");
    let contract_address = deploy_contract("AttenSysCourse", hash);

    let owner_address: ContractAddress = contract_address_const::<'owner'>();
    let dispatcher = IAttenSysCourseDispatcher { contract_address };

    let token_uri_a: ByteArray = "https://dummy_uri.com/your_id";
    let nft_name_a = "cairo_a";
    let nft_symb_a = "CAO";
    start_cheat_caller_address(contract_address, owner_address);
    dispatcher.create_course(owner_address, true, nft_name_a, nft_symb_a, token_uri_a);

    dispatcher.add_replace_course_content(1, owner_address, '123', '567');
    let array_calldata = array![1];
    let course_info = dispatcher.get_course_infos(array_calldata);
    assert(*course_info.at(0).uri.first == '123', 'wrong first uri');
    assert(*course_info.at(0).uri.second == '567', 'wrong second uri');

    let second_array_calldata = array![1];
    dispatcher.add_replace_course_content(1, owner_address, '555', '666');
    let course_info = dispatcher.get_course_infos(second_array_calldata);
    assert(*course_info.at(0).uri.first == '555', 'wrong first uri');
    assert(*course_info.at(0).uri.second == '666', 'wrong second uri');

    let all_courses_info = dispatcher.get_all_courses_info();
    assert(all_courses_info.len() > 0, 'non-write');
    assert(*all_courses_info.at(0).uri.first == '555', 'wrong uri replacement');
    assert(*all_courses_info.at(0).uri.second == '666', 'wrong uri replacement');

    let all_creator_courses = dispatcher.get_all_creator_courses(owner_address);
    assert(all_creator_courses.len() > 0, 'non write CC');
}

#[test]
fn test_create_event() {
    let (_nft_contract_address, hash) = deploy_nft_contract("AttenSysNft");
    let contract_address = deploy_contract("AttenSysEvent", hash);
    let owner_address: ContractAddress = contract_address_const::<'owner'>();
    let owner_address_two: ContractAddress = contract_address_const::<'owner_two'>();
    let dispatcher = IAttenSysEventDispatcher { contract_address };
    let token_uri: ByteArray = "https://dummy_uri.com/your_id";
    let event_name = "web3";
    let nft_name = "onlydust";
    let nft_symb = "OD";
    start_cheat_caller_address(contract_address, owner_address);
    dispatcher
        .create_event(
            owner_address,
            event_name.clone(),
            token_uri,
            nft_name,
            nft_symb,
            2238493,
            32989989,
            true
        );
    let event_details_check = dispatcher.get_event_details(1);
    assert(event_details_check.event_name == event_name, 'wrong_name');
    assert(event_details_check.time.registration_open == true, 'not set');
    assert(event_details_check.time.start_time == 2238493, 'wrong start');
    assert(event_details_check.time.end_time == 32989989, 'wrong end');
    assert(event_details_check.event_organizer == owner_address, 'wrong owner');

    start_cheat_caller_address(contract_address, owner_address_two);
    let token_uri_two: ByteArray = "https://dummy_uri.com/your_id";
    let event_name_two = "web2";
    let nft_name_two = "web3bridge";
    let nft_symb_two = "wb3";
    dispatcher
        .create_event(
            owner_address_two,
            event_name_two.clone(),
            token_uri_two,
            nft_name_two,
            nft_symb_two,
            2238493,
            32989989,
            true
        );

    let event_details_check_two = dispatcher.get_event_details(2);
    assert(event_details_check_two.event_name == event_name_two, 'wrong_name');
}

#[test]
fn test_reg_nd_mark() {
    let (_nft_contract_address, hash) = deploy_nft_contract("AttenSysNft");
    let contract_address = deploy_contract("AttenSysEvent", hash);
    let owner_address: ContractAddress = contract_address_const::<'owner'>();
    let attendee1_address: ContractAddress = contract_address_const::<'attendee1_address'>();
    let attendee2_address: ContractAddress = contract_address_const::<'attendee2_address'>();
    let attendee3_address: ContractAddress = contract_address_const::<'attendee3_address'>();

    let dispatcher = IAttenSysEventDispatcher { contract_address };
    start_cheat_caller_address(contract_address, owner_address);
    let token_uri: ByteArray = "https://dummy_uri.com/your_id";
    let event_name = "web3";
    let nft_name = "onlydust";
    let nft_symb = "OD";
    start_cheat_caller_address(contract_address, owner_address);
    dispatcher
        .create_event(
            owner_address, event_name.clone(), token_uri, nft_name, nft_symb, 223, 329, true
        );

    start_cheat_block_timestamp_global(55555);
    start_cheat_caller_address(contract_address, attendee1_address);
    dispatcher.register_for_event(1);
    dispatcher.mark_attendance(1);
    let all_events = dispatcher.get_all_attended_events(attendee1_address);
    assert(all_events.len() == 1, 'wrong length');

    start_cheat_caller_address(contract_address, attendee2_address);
    dispatcher.register_for_event(1);
    dispatcher.mark_attendance(1);

    start_cheat_caller_address(contract_address, attendee3_address);
    dispatcher.register_for_event(1);
    dispatcher.mark_attendance(1);

    start_cheat_caller_address(contract_address, owner_address);
    dispatcher.batch_certify_attendees(1);

    let nftContract = dispatcher.get_event_nft_contract(1);

    let erc721_token = IERC721Dispatcher { contract_address: nftContract };
    let token_name = erc721_token.name();

    assert(erc721_token.owner_of(1) == attendee1_address, 'wrong 1 token id');
    assert(erc721_token.owner_of(2) == attendee2_address, 'wrong 2 token id');
    assert(erc721_token.owner_of(3) == attendee3_address, 'wrong 3 token id');
    assert(token_name == "onlydust", 'wrong token name');
    let attendance_stat = dispatcher.get_attendance_status(attendee3_address, 1);
    assert(attendance_stat == true, 'wrong attenStat');
}


#[test]
fn test_constructor() {
    let (contract_address, _) = deploy_nft_contract("AttenSysNft");

    let erc721_token = IERC721Dispatcher { contract_address };

    let token_name = erc721_token.name();
    let token_symbol = erc721_token.symbol();

    assert(token_name == "Attensys", 'wrong token name');
    assert(token_symbol == "ATS", 'wrong token symbol');
}

#[test]
fn test_mint() {
    let (contract_address, _) = deploy_nft_contract("AttenSysNft");

    let erc721_token = IERC721Dispatcher { contract_address };

    let token_recipient: ContractAddress = contract_address_const::<'recipient_address'>();

    erc721_token.mint(token_recipient, 1);

    assert(erc721_token.owner_of(1) == token_recipient, 'wrong token id');
    assert(erc721_token.balance_of(token_recipient) > 0, 'mint failed');
}

#[test]
fn test_create_org_profile() {
    let (_nft_contract_address, hash) = deploy_nft_contract("AttenSysNft");
    let contract_address = deploy_contract("AttenSysOrg", hash);
    let owner_address: ContractAddress = contract_address_const::<'owner'>();

    let dispatcher = IAttenSysOrgDispatcher { contract_address };
    start_cheat_caller_address(contract_address, owner_address);
    let org_name: ByteArray = "web3";
    // let token_uri: ByteArray = "https://dummy_uri.com";
    // let nft_name: ByteArray = "cairo";
    // let nft_symb: ByteArray = "CAO";
    let org_ipfs_uri: ByteArray = "0xnsbsmmfbnakkdbbfjsgbdmmcjjmdnweb3";
    dispatcher.create_org_profile(org_name, org_ipfs_uri);
}

#[test]
fn test_add_instructor_to_org() {
    let (_nft_contract_address, hash) = deploy_nft_contract("AttenSysNft");
    let contract_address = deploy_contract("AttenSysOrg", hash);
    let owner_address: ContractAddress = contract_address_const::<'owner'>();
    let instructor_address: ContractAddress = contract_address_const::<'instructor'>();

    let dispatcher = IAttenSysOrgDispatcher { contract_address };
    start_cheat_caller_address(contract_address, owner_address);
    let org_name: ByteArray = "web3";
    // let token_uri: ByteArray = "https://dummy_uri.com";
    // let nft_name: ByteArray = "cairo";
    // let nft_symb: ByteArray = "CAO";
    let org_ipfs_uri: ByteArray = "0xnsbsmmfbnakkdbbfjsgbdmmcjjmdnweb3";
    dispatcher.create_org_profile(org_name, org_ipfs_uri);
    dispatcher.add_instructor_to_org(instructor_address);
    let org = dispatcher.get_org_info(owner_address);
    assert_eq!(org.number_of_instructors, 1);
}

fn test_create_bootcamp_for_org() {
    let (_nft_contract_address, hash) = deploy_nft_contract("AttenSysNft");
    let contract_address = deploy_contract("AttenSysOrg", hash);
    let owner_address: ContractAddress = contract_address_const::<'owner'>();
    let instructor_address: ContractAddress = contract_address_const::<'instructor'>();

    let dispatcher = IAttenSysOrgDispatcher { contract_address };
    start_cheat_caller_address(contract_address, owner_address);
    let org_name: ByteArray = "web3";
    let bootcamp_name: ByteArray = "web3Bridge bootcamp";
    let org_ipfs_uri: ByteArray = "0xnsbsmmfbnakkdbbfjsgbdmmcjjmdnweb3";
    let bootcamp_ipfs_uri: ByteArray = "0xnsbsmmfbnakkdbbfjsgbdmmcjjmdnweb3";
    dispatcher.create_org_profile(org_name.clone(), org_ipfs_uri);
    dispatcher.add_instructor_to_org(owner_address);
    dispatcher.add_instructor_to_org(instructor_address);
    let org = dispatcher.get_org_info(owner_address);
    assert_eq!(org.number_of_instructors, 2);

    let token_uri: ByteArray = "https://dummy_uri.com";
    let nft_name: ByteArray = "cairo";
    let nft_symb: ByteArray = "CAO";

    dispatcher
        .create_bootcamp(
            org_name, bootcamp_name, token_uri, nft_name, nft_symb, 3, bootcamp_ipfs_uri
        );
    assert_eq!(org.number_of_all_bootcamps, 1);
    assert_eq!(org.number_of_all_classes, 3);
}

#[test]
#[should_panic(expected: "no organization created.")]
fn test_when_no_org_address_add_instructor_to_org() {
    let (_nft_contract_address, hash) = deploy_nft_contract("AttenSysNft");
    let contract_address = deploy_contract("AttenSysOrg", hash);
    let instructor_address: ContractAddress = contract_address_const::<'instructor'>();

    let dispatcher = IAttenSysOrgDispatcher { contract_address };
    start_cheat_caller_address(contract_address, instructor_address);
    dispatcher.add_instructor_to_org(instructor_address);
}

