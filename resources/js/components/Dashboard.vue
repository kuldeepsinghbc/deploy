<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Dashbaord Component</div>
                    <data-table-test></data-table-test>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VuetifyTest from './VuetifyTest'
import DataTableTest from './DataTableTest'
    export default {
        components:{VuetifyTest,DataTableTest},
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>