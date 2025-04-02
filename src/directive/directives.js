// 拖拽的指令
// 实现拖拽主要是通过
// onmousedown：鼠标按下事件
// onmousemove：鼠标移动事件
// onmouseup：鼠标抬起事件 实现
const vDrag = {
  mounted (el,binding) {
      console.log(el,binding);
      el.onmousedown = (ev) => {
        console.log(ev);
        // 鼠标按下的位置
        const mouseXStart = ev.clientX;
        const mouseYStart = ev.clientY;
        // console.log("按下开始", mouseXStart, mouseYStart);
        // 当前滑块位置
        const rectLeft = el.offsetLeft;
        const rectTop = el.offsetTop;
        document.onmousemove = (e) => {
          // 鼠标移动的位置
          const mouseXEnd = e.clientX;
          const mouseYEnd = e.clientY;
          const moveX = mouseXEnd - mouseXStart + rectLeft;
          const moveY = mouseYEnd - mouseYStart + rectTop;
          // console.log(rectLeft, rectTop);
          el.style["top"] = moveY + "px";
          el.style["left"] = moveX + "px";
        };
        document.onmouseup = () => {
          // 取消事件
          document.onmousemove = null;
        };
      };
    }
  }
  // 挂载，注册
  const directives = {
    install (app) {
      app.directive('drag', vDrag)
    }
  };
  export default directives


