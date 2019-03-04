"use strict";$R.add("class","table.component",{mixins:["dom","component"],init:function(t,e){return this.app=t,e&&void 0!==e.cmnt?e:this._init(e)},addHead:function(){this.removeHead();var t=this.$element.find("tr").first().children("td, th"),e=0;t.each(function(t){e+=t.colSpan});var a=$R.dom("<thead>"),o=this._buildRow(e,"<th>");a.append(o),this.$element.prepend(a)},addRow:function(t){var e=this._buildRow(t);return this.$element.append(e),e},addRowTo:function(t,e){return this._addRowTo(t,e)},addColumnTo:function(t,l){var e=$R.dom(t),a=e.closest("tr"),o=e.closest("td, th"),n=0;a.find("td, th").each(function(t,e){t===o.get()&&(n=e)}),this.$element.find("tr").each(function(t){var e=$R.dom(t).find("td, th").get(n),a=$R.dom(e),o=a.clone();o.html(""),"right"===l?a.after(o):a.before(o)})},removeHead:function(){var t=this.$element.find("thead");0!==t.length&&t.remove()},removeRow:function(t){$R.dom(t).closest("tr").remove()},removeColumn:function(t){var e=$R.dom(t),a=e.closest("tr"),o=e.closest("td, th"),l=0;a.find("td, th").each(function(t,e){t===o.get()&&(l=e)}),this.$element.find("tr").each(function(t){var e=$R.dom(t).find("td, th").get(l);$R.dom(e).remove()})},_init:function(t){var e,a;if(void 0!==t){var o=$R.dom(t),l=o.get(),n=o.closest("figure");0!==n.length?a=(e=n).find("table").get():"TABLE"===l.tagName&&(a=l)}this._buildWrapper(e),this._buildElement(a),this._initWrapper()},_addRowTo:function(t,e){var a=$R.dom(t).closest("tr");if(0!==a.length){var o=a.children("td, th").length,l=this._buildRow(o);return a[e](l),l}},_buildRow:function(t,e){e=e||"<td>";for(var a=$R.dom("<tr>"),o=0;o<t;o++){var l=$R.dom(e);l.attr("contenteditable",!0),a.append(l)}return a},_buildElement:function(t){t?this.$element=$R.dom(t):(this.$element=$R.dom("<table>"),this.append(this.$element))},_buildWrapper:function(t){t=t||"<figure>",this.parse(t)},_initWrapper:function(){this.addClass("redactor-component"),this.attr({"data-redactor-type":"table",tabindex:"-1",contenteditable:!1})}}),$R.add("plugin","table",{translations:{en:{table:"Table","insert-table":"Insert table","insert-row-above":"Insert row above","insert-row-below":"Insert row below","insert-column-left":"Insert column left","insert-column-right":"Insert column right","add-head":"Add head","delete-head":"Delete head","delete-column":"Delete column","delete-row":"Delete row","delete-table":"Delete table","set-table-theme":"Set table theme","set-cell-background":"Set cell background","merge-cell":"Merge cell"}},modals:{setTableThemeModal:'<form action=""></form>',setCellBackgroundModal:'<form action=""></form>'},onmodal:{setTableThemeModal:{open:function(t,e){if(!this.opts.setTableThemeModal&&void 0!==this.opts.tableClassNames){var a=this.opts.tableClassNames.split(";").reduce(function(t,e){var a=e.split(",");if(a&&2===a.length){var o=a[1];return t+'<option value="'+a[0]+'">'+o+"</option>"}},"");a='<option value="">No Theme</option>'+a,this.opts.setTableThemeModal='<div class="form-item"><label>Select Theme</label><select name="theme">'+a+"\n          </select></div>"}e.append(this.opts.setTableThemeModal)},save:function(t,e){var a=e.getData();a&&null!=a.theme&&this.app.api("plugin.table.setTableTheme",{classValue:a.theme})}},setCellBackgroundModal:{open:function(t,e){if(!this.opts.setCellBackgroundModal&&void 0!==this.opts.cellBackgroundNames){var a=this.opts.cellBackgroundNames.split(";").reduce(function(t,e){var a=e.split(",");if(a&&2===a.length){var o=a[1];return t+'<option value="'+a[0]+'">'+o+"</option>"}},"");a='<option value="">No Background</option>'+a,this.opts.setCellBackgroundModal='<div class="form-item"><label>Select Theme</label><select name="theme">'+a+"\n          </select></div>"}e.append(this.opts.setCellBackgroundModal)},save:function(t,e){var a=e.getData();a&&null!=a.theme&&this.app.api("plugin.table.setCellBackground",{classValue:a.theme})}}},init:function(t){this.app=t,this.lang=t.lang,this.opts=t.opts,this.caret=t.caret,this.editor=t.editor,this.toolbar=t.toolbar,this.component=t.component,this.inspector=t.inspector,this.insertion=t.insertion,this.selection=t.selection,this.block=t.block},oncontextbar:function(t,e){var a=this.inspector.parse(t.target);if(a.isComponentType("table")){var o=a.getComponent(),l={};1<$R.dom(o).find("[data-active]").length&&(l["merge-cell"]={title:this.lang.get("merge-cell"),api:"plugin.table.mergeCell",args:o}),Object.keys(l).length?e.set(t,o,l):e.close()}},ondropdown:{table:{observe:function(t){this._observeDropdown(t)}}},onbottomclick:function(){this.insertion.insertToEnd(this.editor.getLastNode(),"table")},start:function(){var t={observe:"table","insert-table":{title:this.lang.get("insert-table"),api:"plugin.table.insert"},"insert-row-above":{title:this.lang.get("insert-row-above"),classname:"redactor-table-item-observable",api:"plugin.table.addRowAbove"},"insert-row-below":{title:this.lang.get("insert-row-below"),classname:"redactor-table-item-observable",api:"plugin.table.addRowBelow"},"insert-column-left":{title:this.lang.get("insert-column-left"),classname:"redactor-table-item-observable",api:"plugin.table.addColumnLeft"},"insert-column-right":{title:this.lang.get("insert-column-right"),classname:"redactor-table-item-observable",api:"plugin.table.addColumnRight"},"add-head":{title:this.lang.get("add-head"),classname:"redactor-table-item-observable",api:"plugin.table.addHead"},"delete-head":{title:this.lang.get("delete-head"),classname:"redactor-table-item-observable",api:"plugin.table.deleteHead"},"delete-column":{title:this.lang.get("delete-column"),classname:"redactor-table-item-observable",api:"plugin.table.deleteColumn"},"delete-row":{title:this.lang.get("delete-row"),classname:"redactor-table-item-observable",api:"plugin.table.deleteRow"},"delete-table":{title:this.lang.get("delete-table"),classname:"redactor-table-item-observable",api:"plugin.table.deleteTable"}};this.opts.tableClassNames=this.opts.tableClassNames||"table-asics-blue,ASICS Blue;table-asics-light-blue,ASICS Light Blue;table-asics-light-green,ASICS Light Green;table-asics-coral,ASICS Carol",void 0!==this.opts.tableClassNames&&(t["set-table-theme"]={title:this.lang.get("set-table-theme"),classname:"redactor-table-item-observable",api:"plugin.table.setTableThemeModal"}),this.opts.cellBackgroundNames="table-cell-asics-blue,ASICS Blue;table-cell-asics-light-blue,ASICS Light Blue;table-cell-asics-light-green,ASICS Light Green;table-cell-asics-coral,ASICS Carol",void 0!==this.opts.cellBackgroundNames&&(t["set-cell-background"]={title:this.lang.get("set-cell-background"),classname:"redactor-table-item-observable",api:"plugin.table.setCellBackgroundModal"});var e={title:this.lang.get("table")},a=this.toolbar.addButtonBefore("link","table",e);a.setIcon('<i class="re-icon-table"></i>'),a.setDropdown(t);this.minCellWidth=40;var o,l,u=!1,n=!1,i=$(this.app.editor.$editor.nodes[0]);i.on("focus","td,th",function(){i.find("td[data-active],th[data-active]").removeAttr("data-active"),$(this).attr("data-active",""),l=$(o=this).closest("thead,tbody")}),$("body").on("click",function(t){var e=0<$(t.target).closest("table").length,a=0<$(t.target).closest(".redactor-toolbar").length,o=0<$(t.target).closest(".redactor-dropdown").length,l=0<$(".redactor-modal.open").length;e||a||o||l||i.find("td[data-active],th[data-active]").removeAttr("data-active")}),i.on("mousedown","td, th",function(t){n="col-resize"==$(this).css("cursor");var e=$(this).closest("table"),a=$(this).closest(".redactor-component[data-redactor-type='table']");if(b.calcTableElementPosition(e),n){b.isColResize=!0,b.colResizeStartX=t.clientX,b.colResizeStartElement=t.target,b.colResizeStartPositionX=t.target.offsetLeft+t.offsetX,t.preventDefault();var o=$('<div class="redactor-component-table-line"></div>');o.css("left",b.colResizeStartPositionX),a.append(o)}else u=!!1}),$("body").on("mouseup",function(){$(".redactor-component-table-line").remove()}),i.on("mouseup",'.redactor-component[data-redactor-type="table"]',function(t){u=!!0;var e=$(this);if(b.isColResize){b.isColResize=!1;var a=b.colResizeStartElement.lastPoint.col;b.renderColGroup($(this).find("table"),a,b.changeColWidth),e.find(".redactor-component-table-line").remove()}}),i.on("mousemove","td, th",function(t){if(t.target.offsetWidth-t.offsetX<10&&!u?$(this).css("cursor","col-resize"):$(this).css("cursor",""),b.isColResize){for(var e,a=b.colResizeStartX-t.clientX,o=$(this).closest(".redactor-component[data-redactor-type='table']"),l=o.find("thead,tbody").outerWidth(),n=b.colResizeStartElement.lastPoint.col,i=null,s=null,r=0;r<b.tableHeadElements.length;r++){var d=b.tableHeadElements[r][n];(i=i||d).colSpan<d.colSpan&&(i=d);var c=b.tableHeadElements[r][n+1];(s=s||c).colSpan<c.colSpan&&(s=c)}for(r=0;r<b.tableBodyElements.length;r++){d=b.tableBodyElements[r][n];(i=i||d).colSpan>d.colSpan&&(i=d);c=b.tableBodyElements[r][n+1];(s=s||c).colSpan>c.colSpan&&(s=c)}var h,p=o.find("colgroup").find("col");if(0<a)e=(h=p.eq(n)).length?h.attr("width").split("%")[0]/100*l:t.target.offsetWidth/t.target.colSpan,1<i.colSpan&&(e=i.offsetWidth);else e=(h=p.eq(n+1)).length?h.attr("width").split("%")[0]/100*l:t.target.offsetWidth/t.target.colSpan,1<s.colSpan&&(e=s.offsetWidth);if(0<(e-b.minCellWidth>=Math.abs(a))){var m=t.clientX-b.colResizeStartX;o.find(".redactor-component-table-line").css("left",b.colResizeStartPositionX+m),b.changeColWidth=m}}}),i.on("mouseout","td, th",function(){});var b=this;i.on("mouseenter","td, th",function(){var t=$(this).closest("thead,tbody");u&&t[0]===l[0]&&(t.find("td[data-active],th[data-active]").removeAttr("data-active"),b.calcCellMergeRange(o,this),b.renderCellMergeRange(this.tagName,b.finalRange))})},renderColGroup:function(t,n,i){var e=this,a=t.find("colgroup"),s=t.find("thead,tbody").outerWidth(),o=(e.minCellWidth/s*100).toFixed(2),l=s*o/100;if(null!=n){for(var r=null,d=null,c=0;c<e.tableHeadElements.length;c++){var h=e.tableHeadElements[c][n];(r=r||h).colSpan<h.colSpan&&(r=h);var p=e.tableHeadElements[c][n+1];(d=d||p).colSpan<p.colSpan&&(d=p)}for(c=0;c<e.tableBodyElements.length;c++){h=e.tableBodyElements[c][n];(r=r||h).colSpan>h.colSpan&&(r=h);p=e.tableBodyElements[c][n+1];(d=d||p).colSpan>p.colSpan&&(d=p)}}if(null!=n&&null!=i&&a.length){var m=a.find("col"),u=a.find("col").eq(n),b=n+1,f=a.find("col").eq(b),v=u.attr("width").split("%")[0]/100*s,g=v*r.colSpan+i,w=f.attr("width").split("%")[0]/100*s,C=w*d.colSpan-i;g<l&&(i=(g=l)-v*r.colSpan),C<l&&(C=l,i=w*d.colSpan-l);for(var S=(v*r.colSpan+i)/s*100,R=(w*d.colSpan-i)/s*100,T=r.colSpan,E=d.colSpan;T--;){var P=n-T;m.eq(P).attr("width",(S/r.colSpan).toFixed(2)+"%")}for(;E--;){P=n+E+1;m.eq(P).attr("width",(R/d.colSpan).toFixed(2)+"%")}}else{a.remove();var B="<colgroup>"+e.tableBodyElements[0].reduce(function(t,e,a){var o=$(e).attr("colspan")||1,l=$(e).outerWidth();return l/=o,null!=n&&(n-r.colSpan+1<=a&&a<=n&&(l=(Number(l*r.colSpan)+Number(i))/r.colSpan),n+1<=a&&a<=n+1+-1+d.colSpan&&(l=(Number(l*d.colSpan)-Number(i))/d.colSpan)),t+'<col width="'+(l/s*100).toFixed(2)+'%">'},"")+"</colgroup>";t.prepend(B)}},calcCellMergeRange:function(t,e){var a=this,u=a.tableBodyElements;"TH"===t.tagName&&(u=a.tableHeadElements);var o={firstPoint:t.firstPoint,lastPoint:t.lastPoint},l={firstPoint:e.firstPoint,lastPoint:e.lastPoint},n=Math.min(o.firstPoint.row,o.lastPoint.row,l.firstPoint.row,l.lastPoint.row),i=Math.min(o.firstPoint.col,o.lastPoint.col,l.firstPoint.col,l.lastPoint.col),s=Math.max(o.firstPoint.row,o.lastPoint.row,l.firstPoint.row,l.lastPoint.row),r=Math.max(o.firstPoint.col,o.lastPoint.col,l.firstPoint.col,l.lastPoint.col);a.finalRange=function t(e,a,o,l){for(var n=e,i=a,s=o,r=l,d=e;d<=o;d++)for(var c=a;c<=l;c++){var h=u[d][c],p=h.firstPoint,m=h.lastPoint;n=Math.min(parseInt(p.row),parseInt(m.row),n),i=Math.min(p.col,m.col,i),s=Math.max(p.row,m.row,s),r=Math.max(p.col,m.col,r)}return n==e&&i==a&&s==o&&r==l?{minRow:e,minCol:a,maxRow:o,maxCol:l}:t(n,i,s,r)}(n,i,s,r),a.selectedRowRange=s-n+1,a.selectedColRange=r-i+1},renderCellMergeRange:function(t,e){var a=e.minRow,o=e.minCol,l=e.maxRow,n=e.maxCol,i=this.tableBodyElements;"TH"===t&&(i=this.tableHeadElements);for(var s=a;s<=l;s++)for(var r=o;r<=n;r++){var d=i[s][r];$(d).attr("data-active","")}},savePosition:function(t,e){t.lastPoint||(t.firstPoint=e),t.lastPoint=e},calcTableElementPosition:function(t){var h=this;this.tableBodyElements=[],this.tableHeadElements=[];var e=t.find("thead"),a=t.find("tbody");function d(t,e,a,o,l){var n=t.tagName,i=h.tableBodyElements;"TH"===n&&(i=h.tableHeadElements);for(var s=parseInt(e)+parseInt(o),r=parseInt(l)+parseInt(a),d=e;d<s;d++)for(var c=a;c<r;c++)i[d]=i[d]||[],i[d][c]=t}[e,a].map(function(t){var r=h.tableBodyElements;t===e&&(r=h.tableHeadElements),t.find("tr").each(function(i){var t=$(this);r[i]=r[i]||[];var s=0;t.find("td,th").each(function(){var t=$(this).attr("rowspan")||1,e=$(this).attr("colspan")||1;if(r[i][s]){var a=r[i][s],o=$(a).attr("rowspan")||1,l=$(a).attr("colspan")||1;if(1<o||1<l){var n=function t(e,a){var o=r[e][a],l=$(o).attr("rowspan")||1,n=$(o).attr("colspan")||1;return 1<l||1<n?t(e,a+=Number(n)):{indexTr:e,tdIndex:a}}(i,s);s=Number(n.tdIndex),1<t||1<e?(d(this,i,s,t,e),s+=Number(e)):(r[i][s]=this,s++)}else s++}else 1<t||1<e?(d(this,i,s,t,e),s+=Number(e)):(r[i][s]=this,s++)})})}),[h.tableBodyElements,h.tableHeadElements].map(function(t){t.forEach(function(t,e){t.forEach(function(t,e){t.lastPoint=void 0})}),t.forEach(function(t,a){t.forEach(function(t,e){h.savePosition(t,{row:a,col:e})})})})},insert:function(){var t=this.component.create("table");t.$element.addClass("table-asics-richeditor");for(var e=0;e<2;e++)t.addRow(3);t=this.insertion.insertHtml(t),this.caret.setStart(t)},addRowAbove:function(){var t=this._getTable();if(t){var e=this.selection.getCurrent(),a=$(e).closest("td,th")[0],o="td",l=this.tableBodyElements;"TH"===a.tagName&&(l=this.tableHeadElements,o="th");for(var n=a.firstPoint.row,i=l[0].length,s=$("<tr></tr>"),r=0;r<i;r++){var d=l[n][r],c=parseInt($(d).attr("colspan")||1),h=parseInt($(d).attr("rowspan")||1);d.firstPoint.row==n?s.append("<"+o+' contenteditable="true"></'+o+">"):(1<c||1<h)&&($(d).attr("data-spanupdated")||1<h&&($(d).attr("rowspan",h+1),$(d).attr("data-spanupdated","true")))}s.insertBefore($(e).closest("tr")),$(t).find("[data-spanupdated]").removeAttr("data-spanupdated"),this.calcTableElementPosition($(t)),this.renderColGroup($(t))}},addRowBelow:function(){var t=this._getTable();if(t){var e=this.selection.getCurrent(),a=$(e).closest("td,th")[0],o=this.tableBodyElements,l="td";"TH"===a.tagName&&(o=this.tableHeadElements,l="th");for(var n=a.lastPoint.row,i=o[0].length,s=$("<tr></tr>"),r=0;r<i;r++){var d=o[n][r],c=parseInt($(d).attr("colspan")||1),h=parseInt($(d).attr("rowspan")||1);d.lastPoint.row==n?s.append("<"+l+' contenteditable="true"></'+l+">"):(1<c||1<h)&&($(d).attr("data-spanupdated")||1<h&&($(d).attr("rowspan",h+1),$(d).attr("data-spanupdated","true")))}var p=o[a.lastPoint.row].filter(function(t){return 1==t.colSpan&&1==t.rowSpan});0<p.length&&(s.insertAfter($(p[0]).closest("tr")),$(t).find("[data-spanupdated]").removeAttr("data-spanupdated"),this.calcTableElementPosition($(t)),this.renderColGroup($(t)))}},addColumnLeft:function(){var s=this,t=this._getTable();if(t){var e=this.selection.getCurrent(),r=$(e).closest("td,th")[0].firstPoint.col;[s.tableBodyElements,s.tableHeadElements].map(function(t){var e=t.length,a="td";t===s.tableHeadElements&&(a="th");for(var o=0;o<e;o++){var l=t[o][r],n=parseInt($(l).attr("colspan")||1),i=parseInt($(l).attr("rowspan")||1);0==r?$(l).closest("thead,tbody").find("tr").eq(o).prepend("<"+a+' contenteditable="true"></'+a+">"):l.firstPoint.row==o&&(1<n||1<i?$(l).attr("data-spanupdated")||($(l).attr("colspan",n+1),$(l).attr("data-spanupdated","true")):$("<"+a+' contenteditable="true"></'+a+">").insertBefore(l))}}),$(t).find("[data-spanupdated]").removeAttr("data-spanupdated"),s.calcTableElementPosition($(t)),s.renderColGroup($(t))}},addColumnRight:function(){var r=this,t=this._getTable();if(t){var e=this.selection.getCurrent(),d=$(e).closest("td,th")[0].lastPoint.col;[r.tableBodyElements,r.tableHeadElements].map(function(t){var e=t.length,a="td";t===r.tableHeadElements&&(a="th");for(var o=t[0].length,l=0;l<e;l++){var n=t[l][d],i=parseInt($(n).attr("colspan")||1),s=parseInt($(n).attr("rowspan")||1);d==o-1?$(n).closest("thead,tbody").find("tr").eq(l).append("<"+a+' contenteditable="true"></'+a+">"):n.lastPoint.row==l&&(1<i||1<s?$(n).attr("data-spanupdated")||($(n).attr("colspan",i+1),$(n).attr("data-spanupdated","true")):$("<"+a+' contenteditable="true"></'+a+">").insertAfter(n))}}),$(t).find("[data-spanupdated]").removeAttr("data-spanupdated"),r.calcTableElementPosition($(t)),r.renderColGroup($(t))}},addHead:function(){var t=this._getComponent();t&&(this.selection.save(),t.addHead(),this.selection.restore())},deleteHead:function(){var t=this._getComponent();if(t){var e=this.selection.getCurrent();0!==$R.dom(e).closest("thead").length?(t.removeHead(),this.caret.setStart(t)):(this.selection.save(),t.removeHead(),this.selection.restore())}},deleteColumn:function(){var t=this._getTable();if(t){var e=this.selection.getCurrent(),i=$(e).closest("td,th")[0].firstPoint.col;[this.tableBodyElements,this.tableHeadElements].map(function(t){for(var e=t.length,a=0;a<e;a++){var o=t[a][i],l=parseInt($(o).attr("colspan")||1),n=parseInt($(o).attr("rowspan")||1);o.firstPoint.row==a&&(1<l||1<n?$(o).attr("data-spanupdated")||(1<l?($(o).attr("colspan",l-1),$(o).attr("data-spanupdated","true")):$(o).remove()):$(o).remove())}}),$(t).find("[data-spanupdated]").removeAttr("data-spanupdated"),this.calcTableElementPosition($(t)),this.renderColGroup($(t))}},deleteRow:function(){var t=this._getTable();if(t){var e=this.selection.getCurrent(),a=$(e).closest("td,th"),o=a[0],l=this.tableBodyElements;"TH"===o.tagName&&(l=this.tableHeadElements);for(var n=a.closest("tr"),i=o.firstPoint.row,s=l[0].length,r=0;r<s;r++){var d=l[i][r],c=parseInt($(d).attr("colspan")||1),h=parseInt($(d).attr("rowspan")||1);d.firstPoint.col==r&&(1<c||1<h?$(d).attr("data-spanupdated")?$(d).remove():1<h&&($(d).attr("rowspan",h-1),$(d).attr("data-spanupdated","true"),d.firstPoint.row==i&&(r-1<0?n.next().prepend(d):$(d).insertAfter(l[i+1][r-1]))):$(d).remove())}n.remove(),$(t).find("[data-spanupdated]").removeAttr("data-spanupdated"),this.calcTableElementPosition($(t)),this.renderColGroup($(t))}},mergeCell:function(){var t=this,e=this._getTable();if(e&&this._getComponent()){var a=this.selection.getCurrent(),o=$(a).closest("tbody,thead"),l=t.tableBodyElements;"THEAD"===o[0].tagName&&(l=t.tableHeadElements);var n=t.finalRange,i=n.minRow,s=n.minCol,r=n.maxRow,d=n.maxCol,c=$(l[i][s]),h=c.attr("rowspan")||1,p=c.attr("colspan")||1;h=Math.max(h-1,t.selectedRowRange),c.attr("rowspan",h),p=Math.max(p-1,t.selectedColRange),c.attr("colspan",p);for(var m=i;m<=r;m++)for(var u=s;u<=d;u++){var b=l[m][u];b!=c[0]&&$(b).remove(),l[m][u]=c[0],t.savePosition(l[m][u],{x:m,y:u})}t.renderColGroup($(e))}},deleteTable:function(){var t=this._getTable();t&&this.component.remove(t)},clearTableTheme:function(){var t=this._getTable();t&&$R.dom(t).removeClass(this.opts.tableClassNames.toString().replace(/[,;]/g," "))},clearCellBackground:function(){var t=this._getTable();t&&$R.dom(t).find("[data-active]").removeClass(this.opts.cellBackgroundNames.toString().replace(/[,;]/g," "))},setTableTheme:function(t){var e=this._getTable();e&&(this.clearTableTheme(),$R.dom(e).addClass(t.classValue),this.app.api("module.modal.close"))},setCellBackground:function(t){var e=this._getTable();if(e){var a=$R.dom(e).find("[data-active]");this.clearCellBackground(),a.addClass(t.classValue),this.app.api("module.modal.close")}},setTableThemeModal:function(){this.app.api("module.modal.build",{name:"setTableThemeModal",title:"Set table theme",handle:"save",commands:{save:{title:"Save"},cancel:{title:"Cancel"}}})},setCellBackgroundModal:function(){this.app.api("module.modal.build",{name:"setCellBackgroundModal",title:"Set cell background",handle:"save",commands:{save:{title:"Save"},cancel:{title:"Cancel"}}})},_getTable:function(){var t=this.selection.getCurrent(),e=this.inspector.parse(t);if(e.isTable())return e.getTable()},_getComponent:function(){var t=this.selection.getCurrent(),e=this.inspector.parse(t);if(e.isTable()){var a=e.getTable();return this.component.create("table",a)}},_observeDropdown:function(t){var e=this._getTable(),a=t.getItemsByClass("redactor-table-item-observable"),o=t.getItem("insert-table");e?(this._observeItems(a,"enable"),o.disable()):(this._observeItems(a,"disable"),o.enable())},_observeItems:function(t,e){for(var a=0;a<t.length;a++)t[a][e]()}});