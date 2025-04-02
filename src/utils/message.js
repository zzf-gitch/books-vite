import { ElMessage } from "element-plus";

//成功消息提示
export const successmessage=(msg)=>{
    ElMessage({
        showClose: true,
        message: msg,
        type: 'success'
    });
}
//警告消息提示
export const warningmessage=(msg)=>{
    ElMessage({
        showClose: true,
        message: msg,
        type: 'warning'
    });
}
//错误消息提示
export const errormessage=(msg)=>{
    ElMessage({
        showClose: true,
        message: msg,
        type: 'error'
    });
}
//取消操作消息提示
export const infomessage=(msg)=>{
    ElMessage({
        showClose: true,
        message: msg,
        type: 'info'
    });
}