var config = {};

config.appSettings  = {
    appDisplayName : 'ToBeNamed',
    lowercaseAppName : 'tobenamed',
    appDescription : "yourAppDescriptionHere",
    appleId: null,
    ionicAppId: null,
    cordovaLocalNotificationsEnabled : false,
    linkToChromeExtension : "https://chrome.google.com/webstore/detail/quantimodo-life-tracking/lncgjbhijecjdbdgeigfodmiimpmlelg",
    allowOffline : true,
    loaderImagePath : 'img/pop-tart-cat.gif',
    shoppingCartEnabled : true,
    qmApiHostName: 'app.quantimo.do',
    ionNavBarClass:'bar-positive',
    settingsPageOptions :
        {
            showReminderFrequencySelector : true
        },
    defaultState : 'app.measurements-variable-button-icons',
    welcomeState : 'app.welcome',
    appStorageIdentifier: 'MoodiModoData*',
    headline : 'Sync and Analyze Your Data',
    features: [
        ' - Automatically backup and sync your data across devices',
        ' - Track diet, treatments, symptoms, and anything else',
        ' - Analyze your data to see the strongest predictors of your mood'
    ],

    primaryOutcomeVariableDetails : {
        id : 1398,
        name : "Overall Mood",
        variableName: "Overall Mood",
        category : "Mood",
        abbreviatedUnitName : "/5",
        combinationOperation: "MEAN",
        description: 'positive',
        unitName: '1 to 5 Rating'
    },

    primaryOutcomeVariableRatingOptionLabels : [
        'Depressed',
        'Sad',
        'OK',
        'Happy',
        'Ecstatic'
    ],

    primaryOutcomeVariableRatingOptionLowercaseLabels : [
        'depressed',
        'sad',
        'ok',
        'happy',
        'ecstatic'
    ],

    positiveRatingImages : [
        'img/rating/ic_face_depressed.png',
        'img/rating/ic_face_sad.png',
        'img/rating/ic_face_ok.png',
        'img/rating/ic_face_happy.png',
        'img/rating/ic_face_ecstatic.png'
    ],

    negativeRatingImages : [
        'img/rating/ic_face_ecstatic.png',
        'img/rating/ic_face_happy.png',
        'img/rating/ic_face_ok.png',
        'img/rating/ic_face_sad.png',
        'img/rating/ic_face_depressed.png'
    ],

    numericRatingImages : [
        'img/rating/ic_1.png',
        'img/rating/ic_2.png',
        'img/rating/ic_3.png',
        'img/rating/ic_4.png',
        'img/rating/ic_5.png'
    ],

    /* END NEW STUFF */

    welcomeText:"Let's start off by adding your first medication!",
    primaryOutcomeVariableTrackingQuestion : "How are you",
    primaryOutcomeVariableAverageText : "Your average mood is ",
    mobileNotificationImage : "file://img/icons/icon_128.png",
    mobileNotificationText : "Time to track!",
    ratingValueToTextConversionDataSet: {
        "1": "depressed",
        "2": "sad",
        "3": "ok",
        "4": "happy",
        "5": "ecstatic"
    },
    ratingTextToValueConversionDataSet : {
        "depressed" : 1,
        "sad" : 2,
        "ok" : 3,
        "happy" : 4,
        "ecstatic": 5
    },

    "intro" : null,

    helpPopupMessages : {
        "#/app/example" :'You can see and edit your past mood ratings and notes by tapping on any item in the list.  <br/> <br/>You can also add a note by tapping on a mood rating in the list.',
    },

    remindersInbox : {

    },

    wordAliases : {

    },

    floatingMaterialButton : {
        button1 : {
            icon: 'ion-android-notifications-none',
            label: 'Add a Reminder',
            stateAndParameters: "'app.reminderSearch'"
        },
        button2 : {
            icon: 'ion-compose',
            label: 'Record a Measurement',
            stateAndParameters: "'app.measurementAddSearch'"
        },
        button3 : {
            icon: 'ion-ios-medkit-outline',
            label: 'Record a Dose',
            stateAndParameters: "'app.measurementAddSearch', {variableCategoryName: 'Treatments'}"
        },
        button4 : {
            icon: 'ion-sad-outline',
            label: 'Rate a Symptom',
            stateAndParameters: "'app.measurementAddSearch', {variableCategoryName: 'Symptoms'}"
        }
    },

    //****modified default reminders

    defaultVariables : [
        {   id:0,
            variableName : "Pulse",
            shortName :"Pulse",
            chineseName: "脉搏",
            defaultValue :  null,
            abbreviatedUnitName: "bpm",
            reminderFrequency : 0,
            icon: "ion-heart",
            variableCategoryName : "Vital Signs",
            img:"https://maxcdn.icons8.com/windows10/PNG/96/Programming/system_task-100.png",
            localImage:"img/iconImg/pulse.png",
            show:true

        },
        {
            id:12,
            variableName: "Blood Pressure",
            shortName :"Blood Pressure",
            chineseName:"血压",
            icon: "ion-heart",
            abbreviatedUnitName: "mmHg",
            reminderFrequency : "0",
            defaultValue:  "null",
            variableCategoryName : "Vital Signs",
            img:"https://maxcdn.icons8.com/iOS7/PNG/100/Travel/scuba_pressure_gauge-100.png",
            localImage:"img/iconImg/bloodpressure.png",
            show:true
        },
        {
            id:1,
            variableName: "Blood Pressure (Systolic - Top Number)",
            icon: "ion-heart",
            abbreviatedUnitName: "mmHg",
            reminderFrequency: "0",
            defaultValue:  "null",
            variableCategoryName: "Vital Signs",
            img:"https://maxcdn.icons8.com/iOS7/PNG/100/Travel/scuba_pressure_gauge-100.png",
            localImage:"img/iconImg/bloodpressure.png",
            show:false
        },
        {
            id:2,
            variableName: "Blood Pressure (Diastolic - Bottom Number)",
            icon: "ion-heart",
            abbreviatedUnitName: "mmHg",
            reminderFrequency: 0,
            defaultValue:  null,
            variableCategoryName: "Vital Signs",
            img:"https://maxcdn.icons8.com/iOS7/PNG/100/Travel/scuba_pressure_gauge-100.png",
            localImage:"img/iconImg/bloodpressure.png",
            show:false
        },
        {
            id:3,
            variableName: "Core Body Temperature",
            shortName:"Body Temp",
            chineseName:"体温",
            icon: "null",
            abbreviatedUnitName: "C",
            reminderFrequency: 0,
            defaultValue:  null,
            variableCategoryName: "Vital Signs",
            img:"https://maxcdn.icons8.com/iOS7/PNG/100/Science/temperature-100.png",
            localImage:"img/iconImg/Temperature.png",
            show:true
        },
        {
            id:4,
            variableName: "Oxygen Saturation",
            shortName:"H2O Oxygen",
            chineseName:"血氧饱和度",
            icon: null,
            abbreviatedUnitName: "%",
            reminderFrequency: 0,
            defaultValue:  null,
            variableCategoryName: "Vital Signs",
            img:"https://maxcdn.icons8.com/iOS7/PNG/100/Science/oxygen-100.png",
            localImage:"img/iconImg/Oxygen.png",
            show:true
        },
        {
            id:5,
            variableName: "Height",
            shortName: "Height",
            chineseName: "身高",
            icon: null,
            abbreviatedUnitName: "cm",
            reminderFrequency: 0,
            defaultValue:  null,
            variableCategoryName: "Physique",
            img:"https://maxcdn.icons8.com/iOS7/PNG/100/Science/height-100.png",
            localImage:"img/iconImg/Height.png",
            show:true
        },
        {
            id:6,
            variableName: "Weight",
            shortName:"Weight",
            chineseName:"体重",
            icon: null,
            abbreviatedUnitName: "kg",
            reminderFrequency: 0,
            defaultValue:  null,
            variableCategoryName: "Physique",
            img:"https://maxcdn.icons8.com/iOS7/PNG/100/Science/weight-100.png",
            localImage:"img/iconImg/weight.png",
            show:true
        },
        {
            id:7,
            variableName: "Bowel Movements Count(Poop)",
            shortName: "Poop",
            chineseName: "排便",
            icon: null,
            abbreviatedUnitName: "count",
            reminderFrequency: 0,
            defaultValue:  null,
            variableCategoryName: "Symptoms",
            img:"https://maxcdn.icons8.com/iOS7/PNG/100/Messaging/poo-100.png",
            localImage:"img/iconImg/Poo.png",
            show:true
        },
        {
            id:8,
            variableName: "Respiratory Rate",
            shortName:"Respiratory Rate",
            chineseName:"呼吸频率",
            icon: null,
            abbreviatedUnitName: "/minute",
            reminderFrequency : 0,
            defaultValue :  null,
            variableCategoryName : "Vital Signs",
            img:"https://maxcdn.icons8.com/iOS7/PNG/100/Healthcare/lungs-100.png",
            localImage:"img/iconImg/Lungs.png",
            show:true
        },
        {
            id:9,
            variableName: "Blood Glucose Sugar",
            shortName: "Blood Sugar",
            chineseName: "血糖",
            icon: null,
            abbreviatedUnitName: "mg/dL",
            reminderFrequency: 0,
            defaultValue:  null,
            variableCategoryName : "Vital Signs",
            img:"https://maxcdn.icons8.com/iOS7/PNG/100/Industry/water-100.png",
            localImage:"img/iconImg/glucose.png",
            show:true
        },
        {
            id:10,
            variableName: "Mood",
            shortName: "Mood",
            chineseName: "心情",
            icon: null,
            abbreviatedUnitName: "count",
            reminderFrequency: 0,
            defaultValue:  null,
            variableCategoryName : "Mood",
            img:"https://maxcdn.icons8.com/iOS7/PNG/100/Messaging/poo-100.png",
            localImage:"img/iconImg/mood.png",
            show:true
        },
        {
            id:11,
            variableName: "Symptoms",
            shortName: "Symptoms",
            chineseName: "症状",
            icon: null,
            abbreviatedUnitName: "count",
            reminderFrequency: 0,
            defaultValue:  null,
            variableCategoryName: "Symptoms",
            img:"https://maxcdn.icons8.com/iOS7/PNG/100/Messaging/poo-100.png",
            localImage:"img/iconImg/symptoms.png",
            show:true
        }
    ],



    menu : [
        {
            title : 'Reminder Inbox',
            href : '#/app/reminders-inbox',
            icon : 'ion-archive'
        },
        {
            title : 'Favorites',
            href : '#/app/favorites',
            icon : 'ion-ios-star'
        },
        {
            title : 'Measurements Variable Icons',
            href : '#/app/measurements-variable-button-icons',
            icon : 'ion-speedometer'
        },
        {
            title : 'Measurement Variable Button Details',
            href : '#/app/measurement-variable-button-details/:measurementId',
            icon : 'ion-info'
        },
        {
            title : 'Overall Mood',
            click : 'togglePrimaryOutcomeSubMenu',
            showSubMenuVariable : 'showPrimaryOutcomeSubMenu',
            isSubMenuParent : true,
            collapsedIcon : 'ion-happy-outline',
            expandedIcon : 'ion-chevron-down'
        },

        {
            title : 'Charts',
            isSubMenuChild : true,
            showSubMenuVariable : 'showPrimaryOutcomeSubMenu',
            href : '#/app/track',
            icon : 'ion-arrow-graph-up-right'
        },
        {
            title : 'History',
            isSubMenuChild : true,
            showSubMenuVariable : 'showPrimaryOutcomeSubMenu',
            href : '#/app/history',
            icon : 'ion-ios-list-outline'
        },
        {
            title : 'Positive Predictors',
            isSubMenuChild : true,
            showSubMenuVariable : 'showPrimaryOutcomeSubMenu',
            href : '#/app/predictors-positive',
            icon : 'ion-happy-outline'
        },
        {
            title : 'Negative Predictors',
            isSubMenuChild : true,
            showSubMenuVariable : 'showPrimaryOutcomeSubMenu',
            href : '#/app/predictors-negative',
            icon : 'ion-sad-outline'
        },
        {
            title : 'Manage Reminders',
            click : 'toggleReminderSubMenu',
            showSubMenuVariable : 'showReminderSubMenu',
            isSubMenuParent : true,
            collapsedIcon : 'ion-android-notifications-none',
            expandedIcon : 'ion-chevron-down'
        },
        {
            title : 'All Reminders',
            isSubMenuChild : true,
            showSubMenuVariable : 'showReminderSubMenu',
            href : '#/app/reminders-manage/Anything',
            icon : 'ion-android-globe'
        },
        {
            title : 'Emotions',
            isSubMenuChild : true,
            showSubMenuVariable : 'showReminderSubMenu',
            href : '#/app/reminders-manage/Emotions',
            icon : 'ion-happy-outline'
        },
        {
            title : 'Foods',
            isSubMenuChild : true,
            showSubMenuVariable : 'showReminderSubMenu',
            href : '#/app/reminders-manage/Foods',
            icon : 'ion-ios-nutrition-outline'
        },
        {
            title : 'Physical Activity',
            isSubMenuChild : true,
            showSubMenuVariable : 'showReminderSubMenu',
            href : '#/app/reminders-manage/Physical Activity',
            icon : 'ion-ios-body-outline'
        },
        {
            title : 'Symptoms',
            isSubMenuChild : true,
            showSubMenuVariable : 'showReminderSubMenu',
            href : '#/app/reminders-manage/Symptoms',
            icon : 'ion-sad-outline'
        },
        {
            title : 'Treatments',
            isSubMenuChild : true,
            showSubMenuVariable : 'showReminderSubMenu',
            href : '#/app/reminders-manage/Treatments',
            icon : 'ion-ios-medkit-outline'
        },
        {
            title : 'Vital Signs',
            isSubMenuChild : true,
            showSubMenuVariable : 'showReminderSubMenu',
            href : '#/app/reminders-manage/Vital Signs',
            icon : 'ion-ios-pulse'
        },
        {
            title : 'Record Measurement',
            click : 'toggleTrackingSubMenu',
            showSubMenuVariable : 'showTrackingSubMenu',
            isSubMenuParent : true,
            collapsedIcon : 'ion-compose',
            expandedIcon : 'ion-chevron-down'
        },
        {
            title : 'Track Anything',
            isSubMenuChild : true,
            showSubMenuVariable : 'showTrackingSubMenu',
            href : '#/app/measurement-add-search',
            icon : 'ion-android-globe'
        },
        {
            title : 'Record a Meal',
            isSubMenuChild : true,
            showSubMenuVariable : 'showTrackingSubMenu',
            href : '#/app/measurement-add-search-category/Foods',
            icon : 'ion-ios-nutrition-outline'
        },
        {
            title : 'Rate an Emotion',
            isSubMenuChild : true,
            showSubMenuVariable : 'showTrackingSubMenu',
            href : '#/app/measurement-add-search-category/Emotions',
            icon : 'ion-happy-outline'
        },
        {
            title : 'Rate a Symptom',
            isSubMenuChild : true,
            showSubMenuVariable : 'showTrackingSubMenu',
            href : '#/app/measurement-add-search-category/Symptoms',
            icon : 'ion-ios-pulse'
        },
        {
            title : 'Record a Treatment',
            isSubMenuChild : true,
            showSubMenuVariable : 'showTrackingSubMenu',
            href : '#/app/measurement-add-search-category/Treatments',
            icon : 'ion-ios-medkit-outline'
        },
        {
            title : 'Record Activity',
            isSubMenuChild : true,
            showSubMenuVariable : 'showTrackingSubMenu',
            href : '#/app/measurement-add-search-category/Physical Activity',
            icon : 'ion-ios-body-outline'
        },
        {
            title : 'Record Vital Sign',
            isSubMenuChild : true,
            showSubMenuVariable : 'showTrackingSubMenu',
            href : '#/app/measurement-add-search-category/Vital Signs',
            icon : 'ion-ios-pulse'
        },
        {
            title : 'History',
            click : 'toggleHistorySubMenu',
            showSubMenuVariable : 'showHistorySubMenu',
            isSubMenuParent : true,
            collapsedIcon : 'ion-ios-list-outline',
            expandedIcon : 'ion-chevron-down'
        },
        {
            title : 'All Measurements',
            isSubMenuChild : true,
            showSubMenuVariable : 'showHistorySubMenu',
            href : '#/app/history-all/Anything',
            icon : 'ion-android-globe'
        },
        {
            title : 'Emotions',
            isSubMenuChild : true,
            showSubMenuVariable : 'showHistorySubMenu',
            href : '#/app/history-all/Emotions',
            icon : 'ion-happy-outline'
        },
        {
            title : 'Foods',
            isSubMenuChild : true,
            showSubMenuVariable : 'showHistorySubMenu',
            href : '#/app/history-all/Foods',
            icon : 'ion-ios-nutrition-outline'
        },
        {
            title : 'Symptoms',
            isSubMenuChild : true,
            showSubMenuVariable : 'showHistorySubMenu',
            href : '#/app/history-all/Symptoms',
            icon : 'ion-sad-outline'
        },
        {
            title : 'Treatments',
            isSubMenuChild : true,
            showSubMenuVariable : 'showHistorySubMenu',
            href : '#/app/history-all/Treatments',
            icon : 'ion-ios-medkit-outline'
        },
        {
            title : 'Physical Activity',
            isSubMenuChild : true,
            showSubMenuVariable : 'showHistorySubMenu',
            href : '#/app/history-all/Physical Activity',
            icon : 'ion-ios-body-outline'
        },
        {
            title : 'Vital Signs',
            isSubMenuChild : true,
            showSubMenuVariable : 'showHistorySubMenu',
            href : '#/app/history-all/Vital Signs',
            icon : 'ion-ios-pulse'
        },
        {
            title : 'Locations',
            isSubMenuChild : true,
            showSubMenuVariable : 'showHistorySubMenu',
            href : '#/app/history-all/Location',
            icon : 'ion-ios-location-outline'
        },
        {
            title : 'Import Data',
            href : '#/app/import',
            icon : 'ion-ios-cloud-download-outline'
        },
        {
            title : 'Charts',
            href : '#/app/search-variables',
            icon : 'ion-arrow-graph-up-right'
        },
        {
            title : 'Strongest Predictors',
            click : 'togglePredictorSearchSubMenu',
            showSubMenuVariable : 'showPredictorSearchSubMenu',
            isSubMenuParent : true,
            collapsedIcon : 'ion-ios-analytics',
            expandedIcon : 'ion-chevron-down'
        },
        {
            title : 'Predictor Search',
            isSubMenuChild : true,
            showSubMenuVariable : 'showPredictorSearchSubMenu',
            href : '#/app/predictor-search',
            icon : 'ion-search'
        },
        /*        {
         title : 'For Everyone',
         isSubMenuChild : true,
         showSubMenuVariable : 'showPredictorSearchSubMenu',
         href : '#/app/search-common-relationships',
         icon : 'ion-ios-people'
         },
         {
         title : 'For You',
         isSubMenuChild : true,
         showSubMenuVariable : 'showPredictorSearchSubMenu',
         href : '#/app/search-user-relationships',
         icon : 'ion-person'
         },*/
        {
            title : 'Positive Mood',
            isSubMenuChild : true,
            showSubMenuVariable : 'showPredictorSearchSubMenu',
            href : '#/app/predictors-positive',
            icon : 'ion-happy-outline'
        },
        {
            title : 'Negative Mood',
            isSubMenuChild : true,
            showSubMenuVariable : 'showPredictorSearchSubMenu',
            href : '#/app/predictors-negative',
            icon : 'ion-sad-outline'
        },
        {
            title : 'Settings',
            href : '#/app/settings',
            icon : 'ion-ios-gear-outline'
        },
        {
            title : 'Help & Feedback',
            href : "#/app/feedback",
            icon : 'ion-ios-help-outline'
        }
    ]
};

if(!module){
    var module = {};
}

module.exports = config.appSettings;