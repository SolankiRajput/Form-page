

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var StudentDB = "SCHOOL-DB";
var StudentRelation = "STUDENT-TABLE";
var connToken = "90932146|-31949221052354096|90963821";
$('#stuRollno').focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getStudentIdAsJsonObj(){
    var stuRollno = $('#stuRollno').val();
    var jsonStr = {
        id: stuRollno
    };
    return JSON.stringify(jsonStr);
}



function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#stuName').val(record.name);
    $('#stuclass').val(record.class);
    $('#stubirthdate').val(record.birthDate);
    $('#stuaddress').val(record.address);
    $('#stuenrollment').val(record.enrollment);
   
   }
function resetForm() {
$("#stuRollno").val("");
$("#stuName").val("");
$("#stuclass").val("");
$("#stubirthdate").val("");
$("#stuaddress").val("");
$("#stuenrollment").val("");
$("#stuRollno").prop('disabled', false);
$("#save").prop('disabled', true);
$("#change").prop('disabled', true);
$("#reset").prop('disabled', true);
$("#stuRollno").focus();
}


function validateData(){
    var stuRollno, stuName, stuclass, stubirthdate, stuaddress,stuenrollment;
    stuRollno = $("#stuRollno").val();
    stuName = $("#stuName").val();
    stuclass= $("#stuclass").val();
    stubirthdate = $("#stubirthdate").val();
    stuaddress= $("#stuaddress").val();
    stuenrollment = $("#stuenrollment").val();
    
    if(stuRollno===''){
        alert("Student Rollno missing");
        $('#stuRollno').focus();
        return "";
    }
        
     if(stuName===''){
        alert("Student Name missing");
        $('#stuName').focus();
        return "";
    }
        
     if(stuclass===''){
        alert("Student Class missing");
        $('#stuclass').focus();
        return "";
    }
        
     if(stubirthdate===''){
        alert("Student BirthDate missing");
        $('#stubirthdate').focus();
        return "";
    }
        
    if(stuaddress===''){
        alert("Student Address missing");
        $('#stuaddress').focus();
        return "";
    }  
     if(stuenrollment===''){
        alert("Student Enrollment missing");
        $('#stuenrollment').focus();
        return "";
    
    }
    
    var jsonStrObj = {
        stuRollno: stuRollno,
        stuName: stuName,
        stuclass: stuclass,
        stubirthdate: stubirthdate,
        stuaddress: stuaddress,
        stuenrollment: stuenrollment
        
    };
    return JSON.stringify(jsonStrObj);
}

function getStudent(){
    var stuIdJsonObj = getStudentIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, StudentDB, StudentRelation, stuIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
        if(resJsonObj.status === 400){
            $("#save").prop('disabled', false);
            $("#reset").prop('disabled', false);
            $("#stuRollno").focus();
        }
        else if (resJsonObj.status === 200){
            $("#stuRollno").prop('disabled', true);
            fillData(resJsonObj);
            
           $("#change").prop('disabled', false);
            $("#reset").prop('disabled', false);
            $("#stuRollno").focus(); 
            
        }
}

function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === ""){
     return;   
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, StudentDB, StudentRelation);
     alert(putRequest);
     jQuery.ajaxSetup({async: false});
     
     var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
     jQuery.ajaxSetup({async: true});
     resetForm();
     $('#stuRollno').focus();
}


function changeData(){
    $('#change').prop('disabled', true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, StudentDB, StudentRelation, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
     jQuery.ajaxSetup({async: true});
     console.log(resJsonObj);
     resetForm();
     $('#stuRollno').focus();
}
     


