# Dialog
原声js实现的模态框。

## 安装
在页面中引入js与css：
```
<link rel="stylesheet" href="../dialog.css">

```
```
<script src="../dialog.js"></script>
```

## 使用方法
 - 通过点击按钮打开模态框
```
 <button data-modal="modal" data-modal-title="模态框" data-modal-footer="确定">打开模态框</button>
```
可在其中配置模态框内容：
1. data-modal-title:模态框标题
2. data-modal-content:模态框内容
3. data-modal-footer: 模态框底部按钮文字

 - 通过js打开模态框
 ```
  var modal = Modal();
  modal.open({
    title:"模态框",
    content:"hello,world",
    footer:"确定"
  });
 
 ```
 open方法中可传入一个对象来配置内容：
1. title:模态框标题
2. content:模态框内容
3. footer: 模态框底部按钮文字
