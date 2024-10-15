/**
 * This file content is autogenerated at contract deployment.
 * You should not edit it manually or your changes might be overwritten.
 */

export const attensysCourseAbi = [
  {
    type: "impl",
    name: "IAttenSysCourseImpl",
    interface_name: "attendsys::contracts::AttenSysCourse::IAttenSysCourse",
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "struct",
    name: "attendsys::contracts::AttenSysCourse::AttenSysCourse::Uri",
    members: [
      {
        name: "first",
        type: "core::felt252",
      },
      {
        name: "second",
        type: "core::felt252",
      },
    ],
  },
  {
    type: "struct",
    name: "attendsys::contracts::AttenSysCourse::AttenSysCourse::Course",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "course_identifier",
        type: "core::integer::u256",
      },
      {
        name: "accessment",
        type: "core::bool",
      },
      {
        name: "uri",
        type: "attendsys::contracts::AttenSysCourse::AttenSysCourse::Uri",
      },
    ],
  },
  {
    type: "struct",
    name: "attendsys::contracts::AttenSysCourse::AttenSysCourse::Creator",
    members: [
      {
        name: "address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "number_of_courses",
        type: "core::integer::u256",
      },
      {
        name: "creator_status",
        type: "core::bool",
      },
    ],
  },
  {
    type: "function",
    name: "create_course",
    inputs: [
      {
        name: "owner_",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "accessment_",
        type: "core::bool",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "add_replace_course_content",
    inputs: [
      {
        name: "course_identifier",
        type: "core::integer::u256",
      },
      {
        name: "owner_",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "new_course_uri_a",
        type: "core::felt252",
      },
      {
        name: "new_course_uri_b",
        type: "core::felt252",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "finish_course_claim_certification",
    inputs: [
      {
        name: "course_identifier",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "check_course_completion_status_n_certification",
    inputs: [
      {
        name: "course_identifier",
        type: "core::integer::u256",
      },
      {
        name: "candidate",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_course_infos",
    inputs: [
      {
        name: "course_identifiers",
        type: "core::array::Array::<core::integer::u256>",
      },
    ],
    outputs: [
      {
        type: "core::array::Array::<attendsys::contracts::AttenSysCourse::AttenSysCourse::Course>",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_user_completed_courses",
    inputs: [
      {
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::array::Array::<core::integer::u256>",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_all_courses_info",
    inputs: [],
    outputs: [
      {
        type: "core::array::Array::<attendsys::contracts::AttenSysCourse::AttenSysCourse::Course>",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_all_creator_courses",
    inputs: [
      {
        name: "owner_",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::array::Array::<attendsys::contracts::AttenSysCourse::AttenSysCourse::Course>",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_creator_info",
    inputs: [
      {
        name: "creator",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "attendsys::contracts::AttenSysCourse::AttenSysCourse::Creator",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "attendsys::contracts::AttenSysCourse::AttenSysCourse::Event",
    kind: "enum",
    variants: [],
  },
];
export const attensysEventAbi = [
  {
    type: "impl",
    name: "IAttenSysEventImpl",
    interface_name: "attendsys::contracts::AttenSysEvent::IAttenSysEvent",
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>",
      },
      {
        name: "pending_word",
        type: "core::felt252",
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32",
      },
    ],
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "attendsys::contracts::AttenSysEvent::AttenSysEvent::UserAttendedEventStruct",
    members: [
      {
        name: "event_name",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "time",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "struct",
    name: "attendsys::contracts::AttenSysEvent::AttenSysEvent::Time",
    members: [
      {
        name: "registration_open",
        type: "core::bool",
      },
      {
        name: "start_time",
        type: "core::integer::u256",
      },
      {
        name: "end_time",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "struct",
    name: "attendsys::contracts::AttenSysEvent::AttenSysEvent::EventStruct",
    members: [
      {
        name: "event_name",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "time",
        type: "attendsys::contracts::AttenSysEvent::AttenSysEvent::Time",
      },
      {
        name: "active_status",
        type: "core::bool",
      },
      {
        name: "signature_count",
        type: "core::integer::u256",
      },
      {
        name: "event_organizer",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "registered_attendants",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "function",
    name: "create_event",
    inputs: [
      {
        name: "owner_",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "event_name",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "start_time_",
        type: "core::integer::u256",
      },
      {
        name: "end_time_",
        type: "core::integer::u256",
      },
      {
        name: "reg_status",
        type: "core::bool",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "end_event",
    inputs: [
      {
        name: "event_identifier",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "batch_certify_attendees",
    inputs: [
      {
        name: "event_identifier",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "mark_attendance",
    inputs: [
      {
        name: "event_identifier",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "register_for_event",
    inputs: [
      {
        name: "event_identifier",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "get_attendance_status",
    inputs: [
      {
        name: "attendee",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "event_identifier",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "get_all_attended_events",
    inputs: [
      {
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::array::Array::<attendsys::contracts::AttenSysEvent::AttenSysEvent::UserAttendedEventStruct>",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "get_all_list_registered_events",
    inputs: [
      {
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::array::Array::<attendsys::contracts::AttenSysEvent::AttenSysEvent::UserAttendedEventStruct>",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "start_end_reg",
    inputs: [
      {
        name: "reg_stat",
        type: "core::bool",
      },
      {
        name: "event_identifier",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "get_event_details",
    inputs: [
      {
        name: "event_identifier",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "attendsys::contracts::AttenSysEvent::AttenSysEvent::EventStruct",
      },
    ],
    state_mutability: "external",
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "attendsys::contracts::AttenSysEvent::AttenSysEvent::Event",
    kind: "enum",
    variants: [],
  },
];
export const attensysOrgAbi = [
  {
    type: "impl",
    name: "IAttenSysOrgImpl",
    interface_name: "attendsys::contracts::AttenSysOrg::IAttenSysOrg",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "struct",
    name: "attendsys::contracts::AttenSysOrg::AttenSysOrg::Instructor",
    members: [
      {
        name: "address_of_org",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "num_of_classes",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "struct",
    name: "attendsys::contracts::AttenSysOrg::AttenSysOrg::Class",
    members: [
      {
        name: "address_of_org",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "instructor",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "num_of_reg_students",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "struct",
    name: "attendsys::contracts::AttenSysOrg::AttenSysOrg::Organization",
    members: [
      {
        name: "address_of_org",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "org_name",
        type: "core::felt252",
      },
      {
        name: "number_of_instructors",
        type: "core::integer::u256",
      },
      {
        name: "number_of_students",
        type: "core::integer::u256",
      },
      {
        name: "number_of_all_classes",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "function",
    name: "create_org_profile",
    inputs: [
      {
        name: "org_name",
        type: "core::felt252",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "add_instructor_to_org",
    inputs: [
      {
        name: "instructor",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "create_a_class",
    inputs: [
      {
        name: "org_",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "get_org_instructors",
    inputs: [
      {
        name: "org_",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::array::Array::<attendsys::contracts::AttenSysOrg::AttenSysOrg::Instructor>",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_all_org_classes",
    inputs: [
      {
        name: "org_",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::array::Array::<attendsys::contracts::AttenSysOrg::AttenSysOrg::Class>",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_instructor_org_classes",
    inputs: [
      {
        name: "org_",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "instructor",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::array::Array::<attendsys::contracts::AttenSysOrg::AttenSysOrg::Class>",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_org_info",
    inputs: [
      {
        name: "org_",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "attendsys::contracts::AttenSysOrg::AttenSysOrg::Organization",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_all_org_info",
    inputs: [],
    outputs: [
      {
        type: "core::array::Array::<attendsys::contracts::AttenSysOrg::AttenSysOrg::Organization>",
      },
    ],
    state_mutability: "view",
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "attendsys::contracts::AttenSysOrg::AttenSysOrg::Event",
    kind: "enum",
    variants: [],
  },
];