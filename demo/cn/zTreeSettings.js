function getZTreeSettings() {
    return {
        setting: {
            data: {
                keep: {
                    leaf: true,
                    parent: true
                },
                simpleData: {
                    enable: true,
                    idKey: "ID",
                    pIdKey: "pId"
                }
            },
            edit: {
                enable: true,
                showRemoveBtn: true,
                showRenameBtn: function (treeId, treeNode) {
                    return treeNode.isParent
                }
            },
            view: {
                selectedMulti: false,
                addDiyDom: function (treeId, treeNode) {
                    var $aObj = $("#" + treeNode.tId + "_a");
                    var beforeHtml = "<span>11</span>";
                    $aObj.children("#" + treeNode.tId + "_span").before(beforeHtml);
                }
            },
            callback: {
                onClick: function (event, treeId, treeNode, clickFlag) {
                    // console.log(treeNode)
                    if (treeNode.isParent) { //如果点击的是文件夹
                        console.log('点击了文件夹' + treeNode.name)
                    } else { //点击的是文件
                        console.log('加载' + treeNode.name)
                    }
                    //将现有的树转为zNodesData
                    var pNodesZTree = zTreeObj.getNodes()
                    var pNodesSimple = [];
                    for (var i = 0; i < pNodesZTree.length; i++) {
                        Array.prototype.push.apply(pNodesSimple, zTreeObj.transformToArray(
                            pNodesZTree[i]))
                    }
                    console.log(pNodesSimple)
                },
                onRemove: function (event, treeId, treeNode) {
                    if (treeNode.isParent) {
                        isDeleteDir = true;
                        console.log('删除文件夹 ', treeNode.name)
                        //递归删除所有的子节点
                        for (var i = 0; i < treeNode.children.length; i++) {
                            zTreeObj.removeNode(treeNode.children[i], true)
                        }
                        isDeleteDir = false;
                    } else {
                        console.log('删除文件 ' + treeNode.name)
                    }
                },
                beforeRemove: function (treeId, treeNode) {
                    if (treeNode.isParent) {
                        return confirm('确定删除文件夹 ' + treeNode.name + ' 及其包含的所有文件吗?')
                    } else {
                        if (!isDeleteDir) { //如果不是点的删除文件夹触发的删除文件，才给提示，否则，在删除文件夹时已经给过提示，就不再重复提示
                            return confirm('确定删除文件 ' + treeNode.name + ' 吗？')
                        }
                    }
                },
                beforeRename: function (treeId, treeNode, newName, isCancel) {
                    if (isCancel) {
                        return
                    }
                    console.log('修改前:' + treeNode.name);
                    console.log('即将修改为:' + newName); //在此可做判断，是否同意修改
                    return true;
                },
                onRename: function (event, treeId, treeNode, isCancel) {
                    if (isCancel) {
                        return
                    }
                    console.log('修改后' + treeNode.name)
                }
            }
        }
    }
}