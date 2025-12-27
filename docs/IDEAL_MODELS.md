# IDEAL_MODELS (Source of Truth)

This file defines the **ideal SDK model surface** for LifePlus.

## Rules
- Models are **nouns**.
- Do **not** pollute entity models with actions/verbs (Create/Update/List/Validate/Request/Response/etc.).
- Any operation payloads must live in a separate DTO layer, but still **use nouns** (e.g., `OrderCreation`, not `CreateOrderRequest`).
- Avoid generator-leaked helper names like `...Data`, `...Meta`, `...Inner`.

---

## Entity Models (Nouns)

These are the canonical, stable models exposed by SDKs.

- Address
- AmbulanceArea
- AmbulanceOrder
- AnalyticsDailyData
- AnalyticsServiceBreakdown
- AnalyticsSummary
- Appointment
- Beneficiary
- Cart
- CartItem
- Commission
- CommissionRates
- Country
- Credentials
- Diagnostic
- Doctor
- DoctorSlot
- Error
- ErrorDetail
- Hospital
- HomeCareOrder
- HomeSampleOrder
- HomeSampleLabTest
- HotlineRequest
- LifestyleCategory
- Manufacturer
- MedicineGeneric
- MedicineReminderTime
- Order
- Package
- PackageOrderClaim
- PackageServiceUsage
- Partner
- PartnerAnalytics
- PartnerApiKey
- PartnerBasic
- PartnerStats
- PartnerTransaction
- PhoneVerification
- Product
- ReferralLink
- Session
- Settlement
- SettlementDetail
- Specialty
- TelemedicineSlotReservation
- User
- UserRegistration
- VideoCallHistory
- WellbeingOrder

---

## DTO Models (Operation Payloads, still Nouns)

These are request/response payloads for actions. They should NOT be treated as domain entities.

- AmbulanceBooking
- AmbulancePriceQuery
- ApiKeyCreation
- ApiKeyUpdate
- ApiKeyValidation
- AppointmentCreation
- AppointmentList
- AppointmentPaymentUpdate
- AvatarUpload
- CartItemAddition
- CartItemUpdate
- CommissionList
- CorporateCodeValidation
- DiagnosticCreation
- DiagnosticList
- DoctorSlotQuery
- HomeCareOrderCreation
- HotlineRequestList
- MedicineReminderTimeStatusUpdate
- NotificationToken
- OrderCreation
- OrderList
- OrderStatusUpdate
- PackageBooking
- PackageCorporateEnrollment
- PartnerAnalyticsPeriod
- PartnerApiKeyCreation
- PartnerApiKeyList
- PartnerLogin
- PartnerOrderItem
- PartnerOrderResponseData
- PrescriptionUpload
- ProductOrderPlacement
- ProfileUpdate
- PromoCodeCheck
- SettlementList
- SuccessResponse
- TransactionList
- UserPackageStatus
- UserPackageStatusRemainingServices

---

## Mapping: Current generated Go models -> IDEAL model

### Keep as Entity (rename schema if needed)
- `model_address` -> `Address`
- `model_ambulance_area` -> `AmbulanceArea`
- `model_ambulance_order` -> `AmbulanceOrder`
- `model_appointment` -> `Appointment`
- `model_beneficiary` -> `Beneficiary`
- `model_cart` -> `Cart`
- `model_cart_item` -> `CartItem`
- `model_country` -> `Country`
- `model_diagnostic` -> `Diagnostic`
- `model_doctor` -> `Doctor`
- `model_doctor_slot` -> `DoctorSlot`
- `model_error` -> `Error`
- `model_hospital` -> `Hospital`
- `model_home_care_order` -> `HomeCareOrder`
- `model_home_sample_order` -> `HomeSampleOrder`
- `model_home_sample_lab_test__` -> `HomeSampleLabTest` (Go-safe: avoids `_test.go` filename; generator emits double underscore)
- `model_lifestyle_category` -> `LifestyleCategory`
- `model_manufacturer` -> `Manufacturer`
- `model_medicine_reminder_time_update` -> `MedicineReminderTime`
- `model_order` -> `Order`
- `model_package` -> `Package`
- `model_package_order_claim` -> `PackageOrderClaim`
- `model_package_service_usage` -> `PackageServiceUsage`
- `model_partner` -> `Partner`
- `model_partner_api_key` -> `PartnerApiKey`
- `model_phone_verification` -> `PhoneVerification`
- `model_product` -> `Product`
- `model_specialty` -> `Specialty`
- `model_telemedicine_slot_reservation` -> `TelemedicineSlotReservation`
- `model_user` -> `User`
- `model_user_register` -> `UserRegistration`
- `model_video_call_history` -> `VideoCallHistory`
- `model_wellbeing_order` -> `WellbeingOrder`

### DTO layer (rename schema + remove leaky helpers)
- `model_add_to_cart_request` -> `CartItemAddition`
- `model_cart_item_update` -> `CartItemUpdate`
- `model_create_order_request` -> `OrderCreation`
- `model_list_orders_response` -> `OrderList`
- `model_diagnostics_list_response` -> `DiagnosticList`
- `model_update_order_status_request` -> `OrderStatusUpdate`
- `model_book_package_request` -> `PackageBooking`
- `model_package_orders_corporate_enrollment_request` -> `PackageCorporateEnrollment`
- `model_notifications_save_token_request` -> `NotificationToken`
- `model_place_ambulance_order_request` -> `AmbulanceBooking`
- `model_place_product_order_request` -> `ProductOrderPlacement`
- `model_medicine_reminder_time_status_update_request` -> `MedicineReminderTimeStatusUpdate`
- `model_promo_code_validation_request` + `model_promo_code_validation_response` -> `PromoCodeCheck`

### Fix by refactor (remove helper models)
- `model_error_details_inner` -> introduce `ErrorDetail` entity or embed into `Error` without generating `Inner`
- `model_session_request` + `model_session_response` + `model_session_response_data` -> collapse into `Session` + `Credentials`
- `model_partner_api_key_*` (attributes/meta/relationships/data/permissions/etc.) -> collapse into `PartnerApiKey` + `ApiKeyCreation`/`ApiKeyUpdate`/`ApiKeyValidation` and remove exposed helper models

---

## Notes
- This file is the contract. The OpenAPI spec must be shaped so SDK generators produce these names and ONLY these names.
