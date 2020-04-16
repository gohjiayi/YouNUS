<template>
    <div></div>
</template>

<script>
    import GLOBAL from "@/mixins/GLOBAL"
    export default {
        mixins:[GLOBAL],
        methods:{
            createOwnerElement() {
                let isExiest = document.getElementsByClassName("owner-list")[0]
                if (!isExiest) {
                    let gantt_cal_light = document.getElementsByClassName("gantt_cal_light")[0];
                    if (gantt_cal_light) gantt_cal_light.style.height = "auto";

                    let gantt_cal_larea = document.getElementsByClassName("gantt_cal_larea")[0];
                    if (gantt_cal_larea) gantt_cal_larea.style.height = "auto";
                    let newItem = document.createElement("div");
                    newItem.className = "owner-list";
                    let textnode = document.createTextNode("Owner");
                    newItem.appendChild(textnode);
                    let select = document.createElement("SELECT");
                    select.id = "selectElementId";
                    newItem.appendChild(select);
                    var list = document.getElementsByClassName("gantt_cal_larea");
                    if (list[0]) list[0].insertBefore(newItem, list[0].childNodes[2]);
                    var user = this.onlyUserNamesOfUsers,
                        selectEl = document.getElementById('selectElementId');
                    for (var i = 0; i< user.length; i++) {
                        var opt = document.createElement('option');
                        opt.value = user[i];
                        opt.innerHTML = user[i];
                        if (selectEl) selectEl.appendChild(opt);
                    }
                }
            },
        }
    }
</script>

<style>
</style>
