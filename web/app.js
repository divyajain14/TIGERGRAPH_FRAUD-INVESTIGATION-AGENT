// Generated Bundle of All 20 Benchmark Cases for TigerGraph UI
const benchmarkCases = [
  {
    "case_id": "HHG-001",
    "case": {
      "status": "closed_legitimate",
      "verdict": "legitimate",
      "fraud_probability": 0.1,
      "pattern": "none",
      "pattern_description": "",
      "affected_txn_ids": [],
      "first_suspicious_txn_id": "",
      "connected_card_ids": [],
      "connected_device_profiles": [],
      "exposure_usd": 0.0,
      "evidence": [
        {
          "claim": "Billing region 444.0 is an established weekend spending location with 15 historical transactions for this customer.",
          "source": "graph",
          "ref": "DetectOutOfRegionUse",
          "entity_ids": [
            "3514030",
            "C12382-K1"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-0003",
        "CC-0009",
        "CC-0010"
      ],
      "summary": "Investigation of case HHG-001 concluded with verdict 'legitimate' and assessed fraud probability of 0.10. Activity was classified under pattern 'none' with total financial exposure of $0.00. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 1 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-001"
    },
    "evidence_requests": [
      {
        "type": "customer_validation",
        "asked_after_step": 1,
        "assumed_response": "Customer confirmed they made the purchase during their regular weekend visit."
      }
    ],
    "next_best_actions": {
      "initial": [
        {
          "action": "VERIFY_WITH_CUSTOMER",
          "route": "auto",
          "reason": "Policy R1: Verify transaction before taking restrictive action."
        }
      ],
      "final": [
        {
          "action": "CLOSE_NO_FRAUD",
          "route": "auto",
          "reason": "Policy R3: Cardholder confirmed purchase in established secondary region."
        }
      ],
      "what_changed": "Customer confirmed purchase in established region; alert cleared."
    },
    "sar": {
      "file": false,
      "reason": "",
      "narrative": "",
      "subjects": [],
      "total_amount_usd": 0.0,
      "activity_dates": []
    },
    "stop_reason": "Customer confirmation and historical regional presence cleared false alarm under Policy R3.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.03
  },
  {
    "case_id": "HHG-002",
    "case": {
      "status": "closed_legitimate",
      "verdict": "legitimate",
      "fraud_probability": 0.08,
      "pattern": "none",
      "pattern_description": "",
      "affected_txn_ids": [],
      "first_suspicious_txn_id": "",
      "connected_card_ids": [],
      "connected_device_profiles": [],
      "exposure_usd": 0.0,
      "evidence": [
        {
          "claim": "Single isolated online transaction without device compromise or secondary risk indicators.",
          "source": "graph",
          "ref": "TransactionHistory",
          "entity_ids": [
            "3478782",
            "C11891-K1"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-0003",
        "CC-0009",
        "CC-0010"
      ],
      "summary": "Investigation of case HHG-002 concluded with verdict 'legitimate' and assessed fraud probability of 0.08. Activity was classified under pattern 'none' with total financial exposure of $0.00. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 1 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-002"
    },
    "evidence_requests": [
      {
        "type": "customer_validation",
        "asked_after_step": 1,
        "assumed_response": "Customer confirmed authorizing the transaction."
      }
    ],
    "next_best_actions": {
      "initial": [
        {
          "action": "VERIFY_WITH_CUSTOMER",
          "route": "auto",
          "reason": "Policy R1: Verify online charge."
        }
      ],
      "final": [
        {
          "action": "CLOSE_NO_FRAUD",
          "route": "auto",
          "reason": "Policy R3: Customer confirmed charge."
        }
      ],
      "what_changed": "Customer confirmed transaction, clearing alert."
    },
    "sar": {
      "file": false,
      "reason": "",
      "narrative": "",
      "subjects": [],
      "total_amount_usd": 0.0,
      "activity_dates": []
    },
    "stop_reason": "Customer confirmed legitimate transaction under Policy R3.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.0
  },
  {
    "case_id": "HHG-003",
    "case": {
      "status": "closed_legitimate",
      "verdict": "legitimate",
      "fraud_probability": 0.14,
      "pattern": "none",
      "pattern_description": "",
      "affected_txn_ids": [],
      "first_suspicious_txn_id": "",
      "connected_card_ids": [],
      "connected_device_profiles": [],
      "exposure_usd": 0.0,
      "evidence": [
        {
          "claim": "Customer has 58 historical transactions of identical $48.90 - $49.10 amount in physical stores in primary region 330.0.",
          "source": "graph",
          "ref": "TransactionHistory",
          "entity_ids": [
            "3530164",
            "C08623-K2"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-0003",
        "CC-0009",
        "CC-0010"
      ],
      "summary": "Investigation of case HHG-003 concluded with verdict 'legitimate' and assessed fraud probability of 0.14. Activity was classified under pattern 'none' with total financial exposure of $0.00. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 1 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-003"
    },
    "evidence_requests": [
      {
        "type": "customer_validation",
        "asked_after_step": 1,
        "assumed_response": "Customer reviewed the merchant DBA name and confirmed the charge was made by their family member."
      }
    ],
    "next_best_actions": {
      "initial": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R7: Open case to investigate disputed recurring amount."
        },
        {
          "action": "VERIFY_WITH_CUSTOMER",
          "route": "auto",
          "reason": "Policy R7: Present merchant receipt details to cardholder."
        },
        {
          "action": "WARN_CUSTOMER",
          "route": "auto",
          "reason": "Policy R7: Send cardholder receipt details for matching merchant charge."
        }
      ],
      "final": [
        {
          "action": "CLOSE_NO_FRAUD",
          "route": "auto",
          "reason": "Policy R3 & R7: Customer confirmed purchase upon reviewing DBA details."
        }
      ],
      "what_changed": "Customer reviewed merchant details and confirmed transaction was legitimate."
    },
    "sar": {
      "file": false,
      "reason": "",
      "narrative": "",
      "subjects": [],
      "total_amount_usd": 0.0,
      "activity_dates": []
    },
    "stop_reason": "Merchant receipt clarification resolved customer dispute under Policy R3 and R7.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.03
  },
  {
    "case_id": "HHG-004",
    "case": {
      "status": "closed_fraud",
      "verdict": "fraud",
      "fraud_probability": 0.87,
      "pattern": "card_not_present_new_device",
      "pattern_description": "",
      "affected_txn_ids": [
        "3583227"
      ],
      "first_suspicious_txn_id": "3583227",
      "connected_card_ids": [],
      "connected_device_profiles": [
        "firefox 47.0"
      ],
      "exposure_usd": 128.33,
      "evidence": [
        {
          "claim": "Unauthorized online charge inconsistent with customer historical merchant and device profile.",
          "source": "graph",
          "ref": "TransactionHistory",
          "entity_ids": [
            "3583227",
            "C08106-K1"
          ]
        },
        {
          "claim": "Customer reported unauthorized charge on card.",
          "source": "customer",
          "ref": "Customer C08106 message: 'I never made this $128.33 purchase. Please check my card.' Refers to 3583227.",
          "entity_ids": [
            "C08106-K1",
            "C08106"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-3193",
        "CC-3764",
        "CC-3532"
      ],
      "summary": "Investigation of case HHG-004 concluded with verdict 'fraud' and assessed fraud probability of 0.87. Activity was classified under pattern 'card_not_present_new_device' with total financial exposure of $128.33. Investigation established conclusive findings based on 2 primary evidence sources, and recommended 3 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-004"
    },
    "evidence_requests": [],
    "next_best_actions": {
      "initial": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer dispute on unauthorized charge."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block card and reissue."
        }
      ],
      "final": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer dispute on unauthorized charge."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block card and reissue."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "SAR filing required under Policy R2/R6/R9: activity connects to shared device profile or multi-customer fraud ring."
        }
      ],
      "what_changed": "nothing"
    },
    "sar": {
      "file": true,
      "reason": "SAR filing required under Policy R2/R6/R9: activity connects to shared device profile or multi-customer fraud ring.",
      "narrative": "This Suspicious Activity Report documents illicit card activity detected on card C08106-K1 held by customer C08106. Between 2016-12-29 and 2016-12-29, a series of fraudulent transactions totaling $128.33 were conducted through the online channel. The investigation revealed activity matching the 'card_not_present_new_device' typology. Transactions originated from device profile 'firefox 47.0' using masked proxy headers. The customer confirmed the charges were unauthorized, indicating compromised account credentials. The card was immediately blocked, pending transactions declined, and connected entities placed under heightened monitoring. This narrative is filed pursuant to regulatory requirements for coordinated suspicious transaction activity.",
      "subjects": [
        "C08106",
        "C08106-K1",
        "firefox 47.0"
      ],
      "total_amount_usd": 128.33,
      "activity_dates": [
        "2016-12-29",
        "2016-12-29"
      ]
    },
    "stop_reason": "Customer confirmation and device anomaly confirmed card compromise under Policy R2.",
    "tool_calls": 5,
    "tokens": 1550,
    "latency_s": 0.01
  },
  {
    "case_id": "HHG-005",
    "case": {
      "status": "closed_legitimate",
      "verdict": "legitimate",
      "fraud_probability": 0.08,
      "pattern": "none",
      "pattern_description": "",
      "affected_txn_ids": [],
      "first_suspicious_txn_id": "",
      "connected_card_ids": [],
      "connected_device_profiles": [],
      "exposure_usd": 0.0,
      "evidence": [
        {
          "claim": "Transaction executed on new personal tablet device within normal spending bounds.",
          "source": "graph",
          "ref": "DeviceProfileMatch",
          "entity_ids": [
            "3523199",
            "C02923-K1"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-0003",
        "CC-0009",
        "CC-0010"
      ],
      "summary": "Investigation of case HHG-005 concluded with verdict 'legitimate' and assessed fraud probability of 0.08. Activity was classified under pattern 'none' with total financial exposure of $0.00. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 1 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-005"
    },
    "evidence_requests": [
      {
        "type": "customer_validation",
        "asked_after_step": 1,
        "assumed_response": "Customer confirmed adding new iPad and authorizing charge."
      }
    ],
    "next_best_actions": {
      "initial": [
        {
          "action": "VERIFY_WITH_CUSTOMER",
          "route": "auto",
          "reason": "Policy R1: Verify transaction from newly detected device."
        }
      ],
      "final": [
        {
          "action": "CLOSE_NO_FRAUD",
          "route": "auto",
          "reason": "Policy R3: Customer confirmed purchase on newly added device."
        }
      ],
      "what_changed": "Customer confirmed purchase on personal device; alert closed."
    },
    "sar": {
      "file": false,
      "reason": "",
      "narrative": "",
      "subjects": [],
      "total_amount_usd": 0.0,
      "activity_dates": []
    },
    "stop_reason": "Customer verified personal device authorization under Policy R3.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.01
  },
  {
    "case_id": "HHG-006",
    "case": {
      "status": "closed_fraud",
      "verdict": "fraud",
      "fraud_probability": 0.95,
      "pattern": "card_not_present_new_device",
      "pattern_description": "",
      "affected_txn_ids": [
        "3476602",
        "3476633",
        "3476665",
        "3476682"
      ],
      "first_suspicious_txn_id": "3476602",
      "connected_card_ids": [],
      "connected_device_profiles": [
        "Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080"
      ],
      "exposure_usd": 1906.07,
      "evidence": [
        {
          "claim": "Rapid burst of 4 large online authorizations totaling $1,906.07 within a 30-minute window from a new Windows 7 desktop.",
          "source": "graph",
          "ref": "TransactionHistory",
          "entity_ids": [
            "3476602",
            "3476633",
            "3476665",
            "3476682"
          ]
        },
        {
          "claim": "Cardholder reported unrecognized charge.",
          "source": "customer",
          "ref": "Customer C07297 message: 'I never made this $482.12 purchase. Please check my card.' Refers to 3476682.",
          "entity_ids": [
            "C07297-K1",
            "C07297"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-2910",
        "CC-3423",
        "CC-2079"
      ],
      "summary": "Investigation of case HHG-006 concluded with verdict 'fraud' and assessed fraud probability of 0.95. Activity was classified under pattern 'card_not_present_new_device' with total financial exposure of $1906.07. Investigation established conclusive findings based on 2 primary evidence sources, and recommended 3 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-006"
    },
    "evidence_requests": [],
    "next_best_actions": {
      "initial": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer dispute on high-value burst."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block card and reissue."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "Policy R2 & FinCEN: Exposure of $1,906.07 exceeds $1,000 SAR threshold."
        }
      ],
      "final": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer dispute on high-value burst."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block card and reissue."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "Policy R2 & FinCEN: Exposure of $1,906.07 exceeds $1,000 SAR threshold."
        }
      ],
      "what_changed": "nothing"
    },
    "sar": {
      "file": true,
      "reason": "SAR filing required under Policy R2/R6/R9: exposure of $1906.07 exceeds the $1,000 regulatory threshold; activity connects to shared device profile or multi-customer fraud ring.",
      "narrative": "This Suspicious Activity Report documents illicit card activity detected on card C07297-K1 held by customer C07297. Between 2016-11-21 and 2016-11-21, a series of fraudulent transactions totaling $1906.07 were conducted through the online channel. The investigation revealed activity matching the 'card_not_present_new_device' typology. Transactions originated from device profile 'Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080' using masked proxy headers. The customer confirmed the charges were unauthorized, indicating compromised account credentials. The card was immediately blocked, pending transactions declined, and connected entities placed under heightened monitoring. This narrative is filed pursuant to regulatory requirements for coordinated suspicious transaction activity.",
      "subjects": [
        "C07297",
        "C07297-K1",
        "Trident/7.0 | Windows 7 | ie 11.0 for desktop | 1920x1080"
      ],
      "total_amount_usd": 1906.07,
      "activity_dates": [
        "2016-11-21",
        "2016-11-21"
      ]
    },
    "stop_reason": "Customer denial and $1,906.07 burst on new device confirmed fraud requiring SAR under Policy R2.",
    "tool_calls": 5,
    "tokens": 1550,
    "latency_s": 0.01
  },
  {
    "case_id": "HHG-007",
    "case": {
      "status": "closed_legitimate",
      "verdict": "legitimate",
      "fraud_probability": 0.08,
      "pattern": "none",
      "pattern_description": "",
      "affected_txn_ids": [],
      "first_suspicious_txn_id": "",
      "connected_card_ids": [],
      "connected_device_profiles": [],
      "exposure_usd": 0.0,
      "evidence": [
        {
          "claim": "Transaction occurred in primary billing region 264.0 matching customer core history of >2,000 transactions.",
          "source": "graph",
          "ref": "BillingRegionHistory",
          "entity_ids": [
            "3514948",
            "C09933-K2"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-0003",
        "CC-0009",
        "CC-0010"
      ],
      "summary": "Investigation of case HHG-007 concluded with verdict 'legitimate' and assessed fraud probability of 0.08. Activity was classified under pattern 'none' with total financial exposure of $0.00. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 1 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-007"
    },
    "evidence_requests": [],
    "next_best_actions": {
      "initial": [
        {
          "action": "CLOSE_NO_FRAUD",
          "route": "auto",
          "reason": "Policy R3: Alert cleared as legitimate activity in primary billing region."
        }
      ],
      "final": [
        {
          "action": "CLOSE_NO_FRAUD",
          "route": "auto",
          "reason": "Policy R3: Alert cleared as legitimate activity in primary billing region."
        }
      ],
      "what_changed": "nothing"
    },
    "sar": {
      "file": false,
      "reason": "",
      "narrative": "",
      "subjects": [],
      "total_amount_usd": 0.0,
      "activity_dates": []
    },
    "stop_reason": "Transaction matches established primary profile; high risk score identified as false alarm.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.05
  },
  {
    "case_id": "HHG-008",
    "case": {
      "status": "closed_legitimate",
      "verdict": "legitimate",
      "fraud_probability": 0.12,
      "pattern": "none",
      "pattern_description": "",
      "affected_txn_ids": [],
      "first_suspicious_txn_id": "",
      "connected_card_ids": [],
      "connected_device_profiles": [],
      "exposure_usd": 0.0,
      "evidence": [
        {
          "claim": "Transaction of $55.68 matches cardholder regular monthly recurring subscription charged on the 19th of each month.",
          "source": "graph",
          "ref": "SubscriptionCadenceAnalysis",
          "entity_ids": [
            "3558054",
            "C13171-K2"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-0003",
        "CC-0009",
        "CC-0010"
      ],
      "summary": "Investigation of case HHG-008 concluded with verdict 'legitimate' and assessed fraud probability of 0.12. Activity was classified under pattern 'none' with total financial exposure of $0.00. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 1 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-008"
    },
    "evidence_requests": [
      {
        "type": "customer_validation",
        "asked_after_step": 1,
        "assumed_response": "Customer recognized the charge as their monthly software subscription and withdrew the fraud dispute."
      }
    ],
    "next_best_actions": {
      "initial": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R7: Open case to record dispute on recurring transaction."
        },
        {
          "action": "VERIFY_WITH_CUSTOMER",
          "route": "auto",
          "reason": "Policy R7: Remind customer of ongoing recurring subscription agreement."
        },
        {
          "action": "WARN_CUSTOMER",
          "route": "auto",
          "reason": "Policy R7: Provide guidance on merchant cancellation procedures rather than card block."
        }
      ],
      "final": [
        {
          "action": "CLOSE_NO_FRAUD",
          "route": "auto",
          "reason": "Policy R3 & R7: Customer confirmed recurring charge; alert cleared as legitimate."
        }
      ],
      "what_changed": "Customer verified recurring subscription; case closed without blocking card under Policy R7."
    },
    "sar": {
      "file": false,
      "reason": "",
      "narrative": "",
      "subjects": [],
      "total_amount_usd": 0.0,
      "activity_dates": []
    },
    "stop_reason": "Recurring monthly subscription pattern identified and verified under Policy R7.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.01
  },
  {
    "case_id": "HHG-009",
    "case": {
      "status": "closed_fraud",
      "verdict": "fraud",
      "fraud_probability": 0.87,
      "pattern": "card_not_present_fraud",
      "pattern_description": "",
      "affected_txn_ids": [
        "3581141"
      ],
      "first_suspicious_txn_id": "3581141",
      "connected_card_ids": [],
      "connected_device_profiles": [],
      "exposure_usd": 30.02,
      "evidence": [
        {
          "claim": "Unauthorized online charge inconsistent with customer historical merchant and device profile.",
          "source": "graph",
          "ref": "TransactionHistory",
          "entity_ids": [
            "3581141",
            "C08299-K1"
          ]
        },
        {
          "claim": "Customer reported unauthorized charge on card.",
          "source": "customer",
          "ref": "Customer C08299 message: 'I never made this $30.02 purchase. Please check my card.' Refers to 3581141.",
          "entity_ids": [
            "C08299-K1",
            "C08299"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-2728",
        "CC-2449",
        "CC-0340"
      ],
      "summary": "Investigation of case HHG-009 concluded with verdict 'fraud' and assessed fraud probability of 0.87. Activity was classified under pattern 'card_not_present_fraud' with total financial exposure of $30.02. Investigation established conclusive findings based on 2 primary evidence sources, and recommended 2 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-009"
    },
    "evidence_requests": [],
    "next_best_actions": {
      "initial": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer dispute on unauthorized charge."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block card and reissue."
        }
      ],
      "final": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer dispute on unauthorized charge."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block card and reissue."
        }
      ],
      "what_changed": "nothing"
    },
    "sar": {
      "file": false,
      "reason": "",
      "narrative": "",
      "subjects": [],
      "total_amount_usd": 0.0,
      "activity_dates": []
    },
    "stop_reason": "Customer confirmation and device anomaly confirmed card compromise under Policy R2.",
    "tool_calls": 5,
    "tokens": 1550,
    "latency_s": 0.0
  },
  {
    "case_id": "HHG-010",
    "case": {
      "status": "closed_fraud",
      "verdict": "fraud",
      "fraud_probability": 0.89,
      "pattern": "card_not_present_new_device",
      "pattern_description": "",
      "affected_txn_ids": [
        "3506725"
      ],
      "first_suspicious_txn_id": "3506725",
      "connected_card_ids": [],
      "connected_device_profiles": [
        "Windows | Windows 10 | edge 16.0 | 1366x768"
      ],
      "exposure_usd": 1000.03,
      "evidence": [
        {
          "claim": "High risk score (0.90) on $1,000.03 online transaction from a new Windows Edge device, 10x normal average ticket size.",
          "source": "graph",
          "ref": "TransactionHistory",
          "entity_ids": [
            "3506725",
            "C10434-K1"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-5217",
        "CC-4362",
        "CC-1777"
      ],
      "summary": "Investigation of case HHG-010 concluded with verdict 'fraud' and assessed fraud probability of 0.89. Activity was classified under pattern 'card_not_present_new_device' with total financial exposure of $1000.03. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 3 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-010"
    },
    "evidence_requests": [
      {
        "type": "customer_validation",
        "asked_after_step": 1,
        "assumed_response": "Customer responded stating they did not make this $1,000.03 online purchase."
      }
    ],
    "next_best_actions": {
      "initial": [
        {
          "action": "VERIFY_WITH_CUSTOMER",
          "route": "auto",
          "reason": "Policy R1: Verify high-value transaction from new device before block."
        },
        {
          "action": "STEP_UP_AUTH",
          "route": "auto",
          "reason": "Policy R1: Require step-up authentication on high-value online activity."
        }
      ],
      "final": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer denied transaction from unrecognized device."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block compromised card."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "Policy R2: Exposure of $1,000.03 exceeds regulatory reporting threshold."
        }
      ],
      "what_changed": "Customer denied transaction, confirming unauthorized account compromise and triggering SAR."
    },
    "sar": {
      "file": true,
      "reason": "SAR filing required under Policy R2/R6/R9: exposure of $1000.03 exceeds the $1,000 regulatory threshold; activity connects to shared device profile or multi-customer fraud ring.",
      "narrative": "This Suspicious Activity Report documents illicit card activity detected on card C10434-K1 held by customer C10434. Between 2016-12-02 and 2016-12-02, a series of fraudulent transactions totaling $1000.03 were conducted through the online channel. The investigation revealed activity matching the 'card_not_present_new_device' typology. Transactions originated from device profile 'Windows | Windows 10 | edge 16.0 | 1366x768' using masked proxy headers. The customer confirmed the charges were unauthorized, indicating compromised account credentials. The card was immediately blocked, pending transactions declined, and connected entities placed under heightened monitoring. This narrative is filed pursuant to regulatory requirements for coordinated suspicious transaction activity.",
      "subjects": [
        "C10434",
        "C10434-K1",
        "Windows | Windows 10 | edge 16.0 | 1366x768"
      ],
      "total_amount_usd": 1000.03,
      "activity_dates": [
        "2016-12-02",
        "2016-12-02"
      ]
    },
    "stop_reason": "Customer confirmation and high-value single transaction confirmed fraud under Policy R2.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.01
  },
  {
    "case_id": "HHG-011",
    "case": {
      "status": "closed_fraud",
      "verdict": "fraud",
      "fraud_probability": 0.9,
      "pattern": "card_not_present_new_device",
      "pattern_description": "",
      "affected_txn_ids": [
        "3583368"
      ],
      "first_suspicious_txn_id": "3583368",
      "connected_card_ids": [
        "C05595-K1",
        "C03938-K1",
        "C05678-K1"
      ],
      "connected_device_profiles": [
        "SM-G610F Build/NRD90M | chrome 66.0 for android"
      ],
      "exposure_usd": 131.3,
      "evidence": [
        {
          "claim": "Device 'SM-G610F Build/NRD90M | chrome 66.0 for android' executed unauthorized charges across 4 different customer cards between Dec 28 and Dec 31.",
          "source": "graph",
          "ref": "FindSharedDeviceRing",
          "entity_ids": [
            "3583368",
            "C11923-K2",
            "3582730",
            "3582750",
            "3583368",
            "3588413"
          ]
        },
        {
          "claim": "Customer reported unauthorized charge on card.",
          "source": "customer",
          "ref": "Customer C11923 message: 'I never made this $131.30 purchase. Please check my card.' Refers to 3583368.",
          "entity_ids": [
            "C11923-K2",
            "C11923"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-0078",
        "CC-5015",
        "CC-3347"
      ],
      "summary": "Investigation of case HHG-011 concluded with verdict 'fraud' and assessed fraud probability of 0.90. Activity was classified under pattern 'card_not_present_new_device' with total financial exposure of $131.30. Investigation established conclusive findings based on 2 primary evidence sources, and recommended 4 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-011"
    },
    "evidence_requests": [],
    "next_best_actions": {
      "initial": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer dispute on unauthorized transaction."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block compromised card."
        },
        {
          "action": "MONITOR_CONNECTED_CARDS",
          "route": "auto",
          "reason": "Policy R6: Place other cards sharing device profile under monitoring."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "Policy R6: Activity connects to shared device profile and other cards' fraud."
        }
      ],
      "final": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer dispute on unauthorized transaction."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block compromised card."
        },
        {
          "action": "MONITOR_CONNECTED_CARDS",
          "route": "auto",
          "reason": "Policy R6: Place other cards sharing device profile under monitoring."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "Policy R6: Activity connects to shared device profile and other cards' fraud."
        }
      ],
      "what_changed": "nothing"
    },
    "sar": {
      "file": true,
      "reason": "SAR filing required under Policy R2/R6/R9: activity connects to shared device profile or multi-customer fraud ring.",
      "narrative": "This Suspicious Activity Report documents illicit card activity detected on card C11923-K2 held by customer C11923. Between 2016-12-29 and 2016-12-29, a series of fraudulent transactions totaling $131.30 were conducted through the online channel. The investigation revealed activity matching the 'card_not_present_new_device' typology. Transactions originated from device profile 'SM-G610F Build/NRD90M | chrome 66.0 for android' using masked proxy headers. Graph analysis identified shared operational infrastructure linking this activity to additional cards: C05595-K1, C03938-K1, C05678-K1. The customer confirmed the charges were unauthorized, indicating compromised account credentials. The card was immediately blocked, pending transactions declined, and connected entities placed under heightened monitoring. This narrative is filed pursuant to regulatory requirements for coordinated suspicious transaction activity.",
      "subjects": [
        "C11923",
        "C11923-K2",
        "SM-G610F Build/NRD90M | chrome 66.0 for android"
      ],
      "total_amount_usd": 131.3,
      "activity_dates": [
        "2016-12-29",
        "2016-12-29"
      ]
    },
    "stop_reason": "Customer dispute corroborated by multi-card shared device ring under Policy R2 and R6.",
    "tool_calls": 5,
    "tokens": 1550,
    "latency_s": 0.11
  },
  {
    "case_id": "HHG-012",
    "case": {
      "status": "closed_legitimate",
      "verdict": "legitimate",
      "fraud_probability": 0.08,
      "pattern": "none",
      "pattern_description": "",
      "affected_txn_ids": [],
      "first_suspicious_txn_id": "",
      "connected_card_ids": [],
      "connected_device_profiles": [],
      "exposure_usd": 0.0,
      "evidence": [
        {
          "claim": "Multi-day travel sequence across adjacent highways/regions reflects normal road trip travel.",
          "source": "graph",
          "ref": "TravelTrajectoryAnalysis",
          "entity_ids": [
            "3553342",
            "C05876-K2"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-0003",
        "CC-0009",
        "CC-0010"
      ],
      "summary": "Investigation of case HHG-012 concluded with verdict 'legitimate' and assessed fraud probability of 0.08. Activity was classified under pattern 'none' with total financial exposure of $0.00. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 1 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-012"
    },
    "evidence_requests": [
      {
        "type": "customer_validation",
        "asked_after_step": 1,
        "assumed_response": "Customer confirmed road trip across regions."
      }
    ],
    "next_best_actions": {
      "initial": [
        {
          "action": "VERIFY_WITH_CUSTOMER",
          "route": "auto",
          "reason": "Policy R1: Verify travel charge before restrictive action."
        }
      ],
      "final": [
        {
          "action": "CLOSE_NO_FRAUD",
          "route": "auto",
          "reason": "Policy R3: Customer confirmed travel; alert cleared."
        }
      ],
      "what_changed": "Customer confirmed travel; alert cleared."
    },
    "sar": {
      "file": false,
      "reason": "",
      "narrative": "",
      "subjects": [],
      "total_amount_usd": 0.0,
      "activity_dates": []
    },
    "stop_reason": "Customer confirmed travel under Policy R3.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.01
  },
  {
    "case_id": "HHG-013",
    "case": {
      "status": "closed_legitimate",
      "verdict": "legitimate",
      "fraud_probability": 0.08,
      "pattern": "none",
      "pattern_description": "",
      "affected_txn_ids": [],
      "first_suspicious_txn_id": "",
      "connected_card_ids": [],
      "connected_device_profiles": [],
      "exposure_usd": 0.0,
      "evidence": [
        {
          "claim": "Charge of $35.66 matches customer historical purchasing pattern of 52 identical ticket purchases.",
          "source": "graph",
          "ref": "TransactionHistory",
          "entity_ids": [
            "3526826",
            "C07671-K2"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-0003",
        "CC-0009",
        "CC-0010"
      ],
      "summary": "Investigation of case HHG-013 concluded with verdict 'legitimate' and assessed fraud probability of 0.08. Activity was classified under pattern 'none' with total financial exposure of $0.00. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 1 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-013"
    },
    "evidence_requests": [
      {
        "type": "customer_validation",
        "asked_after_step": 1,
        "assumed_response": "Customer confirmed they made the online order."
      }
    ],
    "next_best_actions": {
      "initial": [
        {
          "action": "VERIFY_WITH_CUSTOMER",
          "route": "auto",
          "reason": "Policy R1: Verify online charge."
        }
      ],
      "final": [
        {
          "action": "CLOSE_NO_FRAUD",
          "route": "auto",
          "reason": "Policy R3: Customer confirmed legitimate transaction."
        }
      ],
      "what_changed": "Customer verified order, clearing alert."
    },
    "sar": {
      "file": false,
      "reason": "",
      "narrative": "",
      "subjects": [],
      "total_amount_usd": 0.0,
      "activity_dates": []
    },
    "stop_reason": "Customer confirmed legitimate transaction under Policy R3.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.02
  },
  {
    "case_id": "HHG-014",
    "case": {
      "status": "closed_fraud",
      "verdict": "fraud",
      "fraud_probability": 0.94,
      "pattern": "undocumented",
      "pattern_description": "Coordinated bot fraud syndicate utilizing spoofed device profile 'SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080' behind anonymous proxies. Graph link traversal identified 114 transactions across 52 customer accounts.",
      "affected_txn_ids": [
        "3478561"
      ],
      "first_suspicious_txn_id": "3478561",
      "connected_card_ids": [
        "C11468-K1",
        "C11687-K1",
        "C04311-K1",
        "C09174-K1",
        "C06617-K1"
      ],
      "connected_device_profiles": [
        "SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080"
      ],
      "exposure_usd": 74.96,
      "evidence": [
        {
          "claim": "Device profile SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080 connects 52 accounts with $16,555.80 in exposure.",
          "source": "graph",
          "ref": "FindSharedDeviceRing",
          "entity_ids": [
            "3478561",
            "C13487-K1",
            "3176095",
            "3177482",
            "3178994",
            "3179313"
          ]
        },
        {
          "claim": "Direct precedent in closed cases CC-2649, CC-2971, and CC-2985 documenting anonymous proxy abuse.",
          "source": "document",
          "ref": "CC-2649, CC-2971, CC-2985",
          "entity_ids": [
            "C13487-K1"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-2971",
        "CC-3035",
        "CC-2649"
      ],
      "summary": "Investigation of case HHG-014 concluded with verdict 'fraud' and assessed fraud probability of 0.94. Activity was classified under pattern 'undocumented' with total financial exposure of $74.96. Investigation established conclusive findings based on 2 primary evidence sources, and recommended 5 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-014"
    },
    "evidence_requests": [],
    "next_best_actions": {
      "initial": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R9: Undocumented coordinated fraud pattern requires immediate case opening."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Immediate block on compromised card."
        },
        {
          "action": "MONITOR_CONNECTED_CARDS",
          "route": "auto",
          "reason": "Policy R6: Put other cards linked to the device profile under monitoring."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "Policy R6 & R9: File SAR for multi-account coordinated fraud ring."
        },
        {
          "action": "ESCALATE_TO_ANALYST",
          "route": "auto",
          "reason": "Policy R9: Escalate undocumented syndicate activity to fraud lead."
        }
      ],
      "final": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R9: Undocumented coordinated fraud pattern requires immediate case opening."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Immediate block on compromised card."
        },
        {
          "action": "MONITOR_CONNECTED_CARDS",
          "route": "auto",
          "reason": "Policy R6: Put other cards linked to the device profile under monitoring."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "Policy R6 & R9: File SAR for multi-account coordinated fraud ring."
        },
        {
          "action": "ESCALATE_TO_ANALYST",
          "route": "auto",
          "reason": "Policy R9: Escalate undocumented syndicate activity to fraud lead."
        }
      ],
      "what_changed": "nothing"
    },
    "sar": {
      "file": true,
      "reason": "SAR filing required under Policy R2/R6/R9: activity connects to shared device profile or multi-customer fraud ring; coordinated undocumented syndicate pattern detected under Policy R9.",
      "narrative": "This Suspicious Activity Report documents illicit card activity detected on card C13487-K1 held by customer C13487. Between 2016-11-22 and 2016-11-22, a series of fraudulent transactions totaling $74.96 were conducted through the online channel. The investigation revealed activity matching the 'undocumented' typology. Transactions originated from device profile 'SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080' using masked proxy headers. Graph analysis identified shared operational infrastructure linking this activity to additional cards: C11468-K1, C11687-K1, C04311-K1. The customer confirmed the charges were unauthorized, indicating compromised account credentials. The card was immediately blocked, pending transactions declined, and connected entities placed under heightened monitoring. This narrative is filed pursuant to regulatory requirements for coordinated suspicious transaction activity.",
      "subjects": [
        "C13487",
        "C13487-K1",
        "SM-G935F Build/NRD90M | Android 7.0 | chrome 62.0 for android | 1920x1080"
      ],
      "total_amount_usd": 74.96,
      "activity_dates": [
        "2016-11-22",
        "2016-11-22"
      ]
    },
    "stop_reason": "Multi-account graph link analysis established conclusive coordinated abuse under Policy R6 and R9.",
    "tool_calls": 5,
    "tokens": 1550,
    "latency_s": 0.0
  },
  {
    "case_id": "HHG-015",
    "case": {
      "status": "closed_fraud",
      "verdict": "fraud",
      "fraud_probability": 0.87,
      "pattern": "card_not_present_new_device",
      "pattern_description": "",
      "affected_txn_ids": [
        "3464869"
      ],
      "first_suspicious_txn_id": "3464869",
      "connected_card_ids": [],
      "connected_device_profiles": [
        "Trident/7.0 | Windows 8.1 | ie 11.0 for desktop | 1680x1050"
      ],
      "exposure_usd": 599.94,
      "evidence": [
        {
          "claim": "Unauthorized online charge inconsistent with customer historical merchant and device profile.",
          "source": "graph",
          "ref": "TransactionHistory",
          "entity_ids": [
            "3464869",
            "C03042-K1"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-2910",
        "CC-3423",
        "CC-2079"
      ],
      "summary": "Investigation of case HHG-015 concluded with verdict 'fraud' and assessed fraud probability of 0.87. Activity was classified under pattern 'card_not_present_new_device' with total financial exposure of $599.94. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 3 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-015"
    },
    "evidence_requests": [
      {
        "type": "customer_validation",
        "asked_after_step": 1,
        "assumed_response": "Customer confirmed they did not authorize the online charge."
      }
    ],
    "next_best_actions": {
      "initial": [
        {
          "action": "VERIFY_WITH_CUSTOMER",
          "route": "auto",
          "reason": "Policy R1: Verify unusual online transaction before blocking."
        }
      ],
      "final": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer denied transaction."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block compromised card."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "SAR filing required under Policy R2/R6/R9: activity connects to shared device profile or multi-customer fraud ring."
        }
      ],
      "what_changed": "Customer denied charge, elevating initial verification to card block."
    },
    "sar": {
      "file": true,
      "reason": "SAR filing required under Policy R2/R6/R9: activity connects to shared device profile or multi-customer fraud ring.",
      "narrative": "This Suspicious Activity Report documents illicit card activity detected on card C03042-K1 held by customer C03042. Between 2016-11-17 and 2016-11-17, a series of fraudulent transactions totaling $599.94 were conducted through the online channel. The investigation revealed activity matching the 'card_not_present_new_device' typology. Transactions originated from device profile 'Trident/7.0 | Windows 8.1 | ie 11.0 for desktop | 1680x1050' using masked proxy headers. The customer confirmed the charges were unauthorized, indicating compromised account credentials. The card was immediately blocked, pending transactions declined, and connected entities placed under heightened monitoring. This narrative is filed pursuant to regulatory requirements for coordinated suspicious transaction activity.",
      "subjects": [
        "C03042",
        "C03042-K1",
        "Trident/7.0 | Windows 8.1 | ie 11.0 for desktop | 1680x1050"
      ],
      "total_amount_usd": 599.94,
      "activity_dates": [
        "2016-11-17",
        "2016-11-17"
      ]
    },
    "stop_reason": "Customer confirmation and device anomaly confirmed card compromise under Policy R2.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.0
  },
  {
    "case_id": "HHG-016",
    "case": {
      "status": "closed_fraud",
      "verdict": "fraud",
      "fraud_probability": 0.87,
      "pattern": "card_not_present_new_device",
      "pattern_description": "",
      "affected_txn_ids": [
        "3534820"
      ],
      "first_suspicious_txn_id": "3534820",
      "connected_card_ids": [],
      "connected_device_profiles": [
        "Windows | edge 16.0"
      ],
      "exposure_usd": 59.67,
      "evidence": [
        {
          "claim": "Unauthorized online charge inconsistent with customer historical merchant and device profile.",
          "source": "graph",
          "ref": "TransactionHistory",
          "entity_ids": [
            "3534820",
            "C09988-K1"
          ]
        },
        {
          "claim": "Customer reported unauthorized charge on card.",
          "source": "customer",
          "ref": "Customer C09988 message: 'I never made this $59.67 purchase. Please check my card.' Refers to 3534820.",
          "entity_ids": [
            "C09988-K1",
            "C09988"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-4523",
        "CC-0249",
        "CC-5263"
      ],
      "summary": "Investigation of case HHG-016 concluded with verdict 'fraud' and assessed fraud probability of 0.87. Activity was classified under pattern 'card_not_present_new_device' with total financial exposure of $59.67. Investigation established conclusive findings based on 2 primary evidence sources, and recommended 3 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-016"
    },
    "evidence_requests": [],
    "next_best_actions": {
      "initial": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer dispute on unauthorized charge."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block card and reissue."
        }
      ],
      "final": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer dispute on unauthorized charge."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block card and reissue."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "SAR filing required under Policy R2/R6/R9: activity connects to shared device profile or multi-customer fraud ring."
        }
      ],
      "what_changed": "nothing"
    },
    "sar": {
      "file": true,
      "reason": "SAR filing required under Policy R2/R6/R9: activity connects to shared device profile or multi-customer fraud ring.",
      "narrative": "This Suspicious Activity Report documents illicit card activity detected on card C09988-K1 held by customer C09988. Between 2016-12-11 and 2016-12-11, a series of fraudulent transactions totaling $59.67 were conducted through the online channel. The investigation revealed activity matching the 'card_not_present_new_device' typology. Transactions originated from device profile 'Windows | edge 16.0' using masked proxy headers. The customer confirmed the charges were unauthorized, indicating compromised account credentials. The card was immediately blocked, pending transactions declined, and connected entities placed under heightened monitoring. This narrative is filed pursuant to regulatory requirements for coordinated suspicious transaction activity.",
      "subjects": [
        "C09988",
        "C09988-K1",
        "Windows | edge 16.0"
      ],
      "total_amount_usd": 59.67,
      "activity_dates": [
        "2016-12-11",
        "2016-12-11"
      ]
    },
    "stop_reason": "Customer confirmation and device anomaly confirmed card compromise under Policy R2.",
    "tool_calls": 5,
    "tokens": 1550,
    "latency_s": 0.0
  },
  {
    "case_id": "HHG-017",
    "case": {
      "status": "closed_fraud",
      "verdict": "fraud",
      "fraud_probability": 0.87,
      "pattern": "card_not_present_fraud",
      "pattern_description": "",
      "affected_txn_ids": [
        "3450436",
        "3450503",
        "3450629"
      ],
      "first_suspicious_txn_id": "3450436",
      "connected_card_ids": [],
      "connected_device_profiles": [],
      "exposure_usd": 300.14,
      "evidence": [
        {
          "claim": "Sequence of 3 online charges totaling $300.14 executed within 1 hour behind hidden proxy IP.",
          "source": "graph",
          "ref": "TransactionHistory",
          "entity_ids": [
            "3450436",
            "3450503",
            "3450629"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-5172",
        "CC-5365",
        "CC-5553"
      ],
      "summary": "Investigation of case HHG-017 concluded with verdict 'fraud' and assessed fraud probability of 0.87. Activity was classified under pattern 'card_not_present_fraud' with total financial exposure of $300.14. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 3 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-017"
    },
    "evidence_requests": [
      {
        "type": "customer_validation",
        "asked_after_step": 1,
        "assumed_response": "Customer confirmed they did not authorize the online charge."
      }
    ],
    "next_best_actions": {
      "initial": [
        {
          "action": "VERIFY_WITH_CUSTOMER",
          "route": "auto",
          "reason": "Policy R1: Verify unusual online transaction before blocking."
        }
      ],
      "final": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer denied transaction."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block compromised card."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "SAR filing required under Policy R2/R6/R9: activity connects to shared device profile or multi-customer fraud ring."
        }
      ],
      "what_changed": "Customer denied charge, elevating initial verification to card block."
    },
    "sar": {
      "file": true,
      "reason": "SAR filing required under Policy R2/R6/R9: activity connects to shared device profile or multi-customer fraud ring.",
      "narrative": "This Suspicious Activity Report documents illicit card activity detected on card C04570-K1 held by customer C04570. Between 2016-11-11 and 2016-11-11, a series of fraudulent transactions totaling $300.14 were conducted through the online channel. The investigation revealed activity matching the 'card_not_present_fraud' typology. Transactions originated from device profile 'Windows | Windows 10 | chrome 65.0 | 1920x1080' using masked proxy headers. The customer confirmed the charges were unauthorized, indicating compromised account credentials. The card was immediately blocked, pending transactions declined, and connected entities placed under heightened monitoring. This narrative is filed pursuant to regulatory requirements for coordinated suspicious transaction activity.",
      "subjects": [
        "C04570",
        "C04570-K1",
        "Windows | Windows 10 | chrome 65.0 | 1920x1080"
      ],
      "total_amount_usd": 300.14,
      "activity_dates": [
        "2016-11-11",
        "2016-11-11"
      ]
    },
    "stop_reason": "Customer confirmation and device anomaly confirmed card compromise under Policy R2.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.01
  },
  {
    "case_id": "HHG-018",
    "case": {
      "status": "closed_fraud",
      "verdict": "fraud",
      "fraud_probability": 0.93,
      "pattern": "out_of_region_use",
      "pattern_description": "",
      "affected_txn_ids": [
        "3491361"
      ],
      "first_suspicious_txn_id": "3491361",
      "connected_card_ids": [],
      "connected_device_profiles": [],
      "exposure_usd": 39.08,
      "evidence": [
        {
          "claim": "Card-present transaction in region 126.0 occurred only 8 minutes before physical card transaction in region 325.0.",
          "source": "graph",
          "ref": "DetectOutOfRegionUse",
          "entity_ids": [
            "3491361",
            "3491379",
            "C02354-K2"
          ]
        },
        {
          "claim": "Customer reported unrecognized in-person purchase while retaining physical possession of card.",
          "source": "customer",
          "ref": "Customer C02354 message: 'I never made this $39.08 purchase. Please check my card.' Refers to 3491361.",
          "entity_ids": [
            "C02354-K2",
            "C02354"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-0837",
        "CC-4626",
        "CC-0704"
      ],
      "summary": "Investigation of case HHG-018 concluded with verdict 'fraud' and assessed fraud probability of 0.93. Activity was classified under pattern 'out_of_region_use' with total financial exposure of $39.08. Investigation established conclusive findings based on 2 primary evidence sources, and recommended 2 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-018"
    },
    "evidence_requests": [],
    "next_best_actions": {
      "initial": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer dispute on card-present clone."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block counterfeit cloned card immediately."
        }
      ],
      "final": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R2: Customer dispute on card-present clone."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block counterfeit cloned card immediately."
        }
      ],
      "what_changed": "nothing"
    },
    "sar": {
      "file": false,
      "reason": "",
      "narrative": "",
      "subjects": [],
      "total_amount_usd": 0.0,
      "activity_dates": []
    },
    "stop_reason": "Impossible physical velocity and customer report confirmed cloned card counterfeit under Policy R2.",
    "tool_calls": 5,
    "tokens": 1550,
    "latency_s": 0.13
  },
  {
    "case_id": "HHG-019",
    "case": {
      "status": "closed_fraud",
      "verdict": "fraud",
      "fraud_probability": 0.91,
      "pattern": "undocumented",
      "pattern_description": "Automated bot ring utilizing uniform $100 purchase amounts from device profile 'Windows | other | chrome 61.0 | 1280x720' across 5 distinct customer accounts within a narrow 5-day window.",
      "affected_txn_ids": [
        "3503878"
      ],
      "first_suspicious_txn_id": "3503878",
      "connected_card_ids": [
        "C11309-K1",
        "C06224-K1",
        "C01983-K1",
        "C01104-K1"
      ],
      "connected_device_profiles": [
        "Windows | other | chrome 61.0 | 1280x720"
      ],
      "exposure_usd": 99.92,
      "evidence": [
        {
          "claim": "Exact matching device profile 'Windows | other | chrome 61.0 | 1280x720' conducted identical ~$100 charges across 5 independent accounts.",
          "source": "graph",
          "ref": "FindSharedDeviceRing",
          "entity_ids": [
            "3503878",
            "C07987-K2",
            "3497738",
            "3503878",
            "3503988",
            "3513574",
            "3513647"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-2971",
        "CC-3035",
        "CC-2985"
      ],
      "summary": "Investigation of case HHG-019 concluded with verdict 'fraud' and assessed fraud probability of 0.91. Activity was classified under pattern 'undocumented' with total financial exposure of $99.92. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 4 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-019"
    },
    "evidence_requests": [],
    "next_best_actions": {
      "initial": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R9: Undocumented automated bot pattern across multiple cards."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block compromised card."
        },
        {
          "action": "MONITOR_CONNECTED_CARDS",
          "route": "auto",
          "reason": "Policy R6: Monitor linked cards in bot ring."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "Policy R6: Coordinated shared origin activity requires regulatory SAR filing."
        }
      ],
      "final": [
        {
          "action": "CREATE_CASE",
          "route": "auto",
          "reason": "Policy R9: Undocumented automated bot pattern across multiple cards."
        },
        {
          "action": "BLOCK_CARD",
          "route": "L1",
          "reason": "Policy R2: Block compromised card."
        },
        {
          "action": "MONITOR_CONNECTED_CARDS",
          "route": "auto",
          "reason": "Policy R6: Monitor linked cards in bot ring."
        },
        {
          "action": "FILE_REPORT",
          "route": "L2",
          "reason": "Policy R6: Coordinated shared origin activity requires regulatory SAR filing."
        }
      ],
      "what_changed": "nothing"
    },
    "sar": {
      "file": true,
      "reason": "SAR filing required under Policy R2/R6/R9: activity connects to shared device profile or multi-customer fraud ring; coordinated undocumented syndicate pattern detected under Policy R9.",
      "narrative": "This Suspicious Activity Report documents illicit card activity detected on card C07987-K2 held by customer C07987. Between 2016-12-01 and 2016-12-01, a series of fraudulent transactions totaling $99.92 were conducted through the online channel. The investigation revealed activity matching the 'undocumented' typology. Transactions originated from device profile 'Windows | other | chrome 61.0 | 1280x720' using masked proxy headers. Graph analysis identified shared operational infrastructure linking this activity to additional cards: C11309-K1, C06224-K1, C01983-K1. The customer confirmed the charges were unauthorized, indicating compromised account credentials. The card was immediately blocked, pending transactions declined, and connected entities placed under heightened monitoring. This narrative is filed pursuant to regulatory requirements for coordinated suspicious transaction activity.",
      "subjects": [
        "C07987",
        "C07987-K2",
        "Windows | other | chrome 61.0 | 1280x720"
      ],
      "total_amount_usd": 99.92,
      "activity_dates": [
        "2016-12-01",
        "2016-12-01"
      ]
    },
    "stop_reason": "Graph ring detection confirmed multi-card automated syndicate under Policy R6 and R9.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.0
  },
  {
    "case_id": "HHG-020",
    "case": {
      "status": "closed_legitimate",
      "verdict": "legitimate",
      "fraud_probability": 0.08,
      "pattern": "none",
      "pattern_description": "",
      "affected_txn_ids": [],
      "first_suspicious_txn_id": "",
      "connected_card_ids": [],
      "connected_device_profiles": [],
      "exposure_usd": 0.0,
      "evidence": [
        {
          "claim": "Single isolated online transaction without device compromise or secondary risk indicators.",
          "source": "graph",
          "ref": "TransactionHistory",
          "entity_ids": [
            "3509359",
            "C12265-K2"
          ]
        }
      ],
      "similar_prior_cases": [
        "CC-0003",
        "CC-0009",
        "CC-0010"
      ],
      "summary": "Investigation of case HHG-020 concluded with verdict 'legitimate' and assessed fraud probability of 0.08. Activity was classified under pattern 'none' with total financial exposure of $0.00. Investigation established conclusive findings based on 1 primary evidence sources, and recommended 1 next-best actions in accordance with bank fraud policies.",
      "written_to_graph": true,
      "graph_case_id": "CASE-HHG-020"
    },
    "evidence_requests": [
      {
        "type": "customer_validation",
        "asked_after_step": 1,
        "assumed_response": "Customer confirmed authorizing the transaction."
      }
    ],
    "next_best_actions": {
      "initial": [
        {
          "action": "VERIFY_WITH_CUSTOMER",
          "route": "auto",
          "reason": "Policy R1: Verify online charge."
        }
      ],
      "final": [
        {
          "action": "CLOSE_NO_FRAUD",
          "route": "auto",
          "reason": "Policy R3: Customer confirmed charge."
        }
      ],
      "what_changed": "Customer confirmed transaction, clearing alert."
    },
    "sar": {
      "file": false,
      "reason": "",
      "narrative": "",
      "subjects": [],
      "total_amount_usd": 0.0,
      "activity_dates": []
    },
    "stop_reason": "Customer confirmed legitimate transaction under Policy R3.",
    "tool_calls": 5,
    "tokens": 1400,
    "latency_s": 0.0
  }
];

let currentCase = benchmarkCases[0];
let networkInstance = null;

function renderCaseList() {
    const container = document.getElementById('case-list-container');
    container.innerHTML = '';
    
    benchmarkCases.forEach((c, idx) => {
        const isFraud = c.case.verdict === 'fraud';
        const card = document.createElement('div');
        card.className = `case-card ${c.case_id === currentCase.case_id ? 'active' : ''}`;
        card.onclick = () => selectCase(c.case_id);
        
        card.innerHTML = `
            <div class="case-card-header">
                <span class="case-card-id">${c.case_id}</span>
                <span class="badge-verdict ${isFraud ? 'badge-fraud' : 'badge-legit'}">${c.case.verdict.toUpperCase()}</span>
            </div>
            <div class="case-card-sub">
                <span>${c.case.pattern.replace(/_/g, ' ')}</span>
                <span>${isFraud ? '$' + c.case.exposure_usd.toFixed(2) : '$0.00'}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function selectCase(caseId) {
    currentCase = benchmarkCases.find(c => c.case_id === caseId);
    renderCaseList();
    renderCaseView();
}

function renderCaseView() {
    const view = document.getElementById('main-content-view');
    const c = currentCase.case;
    const isFraud = c.verdict === 'fraud';
    const nba = currentCase.next_best_actions;
    const sar = currentCase.sar;

    view.innerHTML = `
        <!-- Case Hero Header -->
        <div class="case-hero">
            <div class="hero-left">
                <h2>
                    <span>Case ${currentCase.case_id}</span>
                    <span class="badge-verdict ${isFraud ? 'badge-fraud' : 'badge-legit'}" style="font-size: 13px; padding: 4px 12px;">
                        ${c.verdict.toUpperCase()} (${(c.fraud_probability * 100).toFixed(0)}% PROB)
                    </span>
                    <span class="badge" style="background: #1F2937; color: #9CA3AF; border: 1px solid #374151;">
                        Pattern: ${c.pattern.replace(/_/g, ' ')}
                    </span>
                </h2>
                <p>${c.summary}</p>
            </div>
            <div class="hero-stats">
                <div class="stat-box">
                    <div class="stat-label">Assessed Exposure</div>
                    <div class="stat-value ${isFraud ? 'stat-val-fraud' : 'stat-val-legit'}">
                        $${c.exposure_usd.toFixed(2)}
                    </div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">SAR Regulatory Filing</div>
                    <div class="stat-value" style="color: ${sar.file ? '#C4B5FD' : '#6B7280'}">
                        ${sar.file ? 'REQUIRED' : 'NOT REQUIRED'}
                    </div>
                </div>
            </div>
        </div>

        <!-- 2 Column Section: Graph Network & Next Best Actions -->
        <div class="grid-2col">
            <!-- Left: Graph Subgraph & Memory -->
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><line x1="8.5" y1="7.5" x2="15.5" y2="16.5"/><line x1="8.5" y1="16.5" x2="15.5" y2="7.5"/></svg>
                        TigerGraph Entity Traversal & Subgraph
                    </div>
                    <span style="font-size: 12px; color: var(--text-muted); font-family: monospace;">Written to Graph: ${c.written_to_graph ? 'YES' : 'NO'}</span>
                </div>
                <div id="graph-network"></div>

                <div style="margin-top: 16px;">
                    <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">
                        CASE MEMORY PRECEDENTS RETRIEVED (FROM 5,565 CLOSED CASES):
                    </div>
                    <div>
                        ${c.similar_prior_cases.map(cid => `<span class="memory-tag">${cid}</span>`).join('')}
                    </div>
                </div>
            </div>

            <!-- Right: Next Best Actions Progression -->
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                        Next-Best Actions & Policy Routing
                    </div>
                    <span style="font-size: 11px; background: rgba(59, 130, 246, 0.15); color: #93C5FD; padding: 2px 8px; border-radius: 6px; font-weight: 600;">
                        Policy Rules R1-R10
                    </span>
                </div>

                <div style="margin-bottom: 14px;">
                    <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase;">
                        Final Recommended Actions (After Evidence)
                    </div>
                    ${nba.final.map(a => `
                        <div class="action-card">
                            <div class="action-card-header">
                                <span class="action-name">${a.action}</span>
                                <span class="action-route">${a.route.toUpperCase()}</span>
                            </div>
                            <div class="action-reason">${a.reason}</div>
                        </div>
                    `).join('')}
                </div>

                ${currentCase.evidence_requests.length > 0 ? `
                    <div style="background: #111B2E; border: 1px solid #1E3A8A; border-radius: 8px; padding: 12px; margin-top: 10px;">
                        <div style="font-size: 11px; font-weight: 700; color: #60A5FA; margin-bottom: 4px;">CONTROLLED EVIDENCE REQUEST SIMULATION:</div>
                        <div style="font-size: 12px; color: #D1D5DB;">"${currentCase.evidence_requests[0].assumed_response}"</div>
                        <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">What changed: ${nba.what_changed}</div>
                    </div>
                ` : ''}
            </div>
        </div>

        <!-- Evidence & Regulatory SAR Section -->
        <div class="grid-2col">
            <!-- Evidence Items -->
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        Investigation Evidence Log
                    </div>
                    <span style="font-size: 12px; color: var(--text-muted);">${c.evidence.length} Findings</span>
                </div>
                ${c.evidence.map(e => `
                    <div class="evidence-item">
                        <div class="evidence-claim">${e.claim}</div>
                        <div class="evidence-meta">Source: ${e.source.toUpperCase()} &bull; Ref: ${e.ref} &bull; Entities: ${e.entity_ids.slice(0, 3).join(', ')}</div>
                    </div>
                `).join('')}
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 10px;">
                    <strong>Stop Reason:</strong> ${currentCase.stop_reason}
                </div>
            </div>

            <!-- Regulatory SAR Box -->
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                        Regulatory Compliance (FinCEN SAR Narrative)
                    </div>
                    <span style="font-size: 11px; padding: 2px 8px; border-radius: 6px; font-weight: 700; ${sar.file ? 'background: #5B21B6; color: #EDE9FE;' : 'background: #374151; color: #9CA3AF;'}">
                        ${sar.file ? 'SAR FILED' : 'NOT REQUIRED'}
                    </span>
                </div>

                ${sar.file ? `
                    <div class="sar-box">
                        <div class="sar-header">
                            <span class="sar-title">Official SAR Narrative (FinCEN Standard)</span>
                            <span style="font-size: 11px; color: #A78BFA; font-family: monospace;">Amount: $${sar.total_amount_usd.toFixed(2)}</span>
                        </div>
                        <p class="sar-text">${sar.narrative}</p>
                        <div style="margin-top: 10px; font-size: 11px; color: #9CA3AF;">
                            <strong>Subjects:</strong> ${sar.subjects.join(', ')}
                        </div>
                    </div>
                ` : `
                    <div style="padding: 30px 20px; text-align: center; color: var(--text-muted); font-size: 13px;">
                        No suspicious activity report required under bank policy thresholds. Transaction cleared or below mandatory filing criteria.
                    </div>
                `}
            </div>
        </div>
    `;

    renderNetworkGraph();
}

function renderNetworkGraph() {
    const container = document.getElementById('graph-network');
    const c = currentCase.case;
    const isFraud = c.verdict === 'fraud';

    const nodes = [
        { id: 'case', label: currentCase.case_id, color: '#FF6A00', shape: 'diamond', size: 28, font: { color: '#fff' } },
        { id: 'card', label: 'Card: ' + (c.connected_card_ids[0] || 'Target-K1'), color: '#3B82F6', shape: 'box', font: { color: '#fff' } },
        { id: 'txn', label: 'Flagged Txn', color: isFraud ? '#EF4444' : '#10B981', shape: 'dot', size: 22, font: { color: '#fff' } }
    ];

    const edges = [
        { from: 'case', to: 'card', label: 'ON_CARD', color: '#6B7280' },
        { from: 'card', to: 'txn', label: 'MADE', color: '#6B7280' }
    ];

    if (c.connected_device_profiles && c.connected_device_profiles.length > 0) {
        nodes.push({ id: 'dev', label: 'Device Profile', color: '#8B5CF6', shape: 'triangle', size: 20, font: { color: '#fff' } });
        edges.push({ from: 'txn', to: 'dev', label: 'FROM_DEVICE', color: '#8B5CF6' });

        if (c.connected_card_ids.length > 1) {
            c.connected_card_ids.slice(1, 3).forEach((ccid, idx) => {
                const otherId = 'ocard_' + idx;
                nodes.push({ id: otherId, label: ccid, color: '#EF4444', shape: 'box', font: { color: '#fff' } });
                edges.push({ from: 'dev', to: otherId, label: 'LINKED_CARD', color: '#EF4444' });
            });
        }
    }

    const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
    const options = {
        physics: { stabilization: true, barnesHut: { springLength: 100 } },
        nodes: { borderWidth: 2, shadow: true },
        edges: { font: { size: 10, color: '#9CA3AF', strokeWidth: 0 }, arrows: 'to' }
    };

    if (networkInstance) { networkInstance.destroy(); }
    networkInstance = new vis.Network(container, data, options);
}

// Initialize
renderCaseList();
renderCaseView();
