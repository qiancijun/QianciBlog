<template>
    <div class="category-card-container">
        <div class="category-card" v-for="(item, index) in categories" :key="index" @click="toCategoryPage(item.id)">
            <img :src='item.categoryUrl'>
            <h2>{{item.categoryName}}</h2>
            <p>收录数目：{{item.categoryNumber}}</p>
        </div>
    </div>
</template>

<style lang="less">
.category-card-container {
    width: 80%;
    margin: 20px auto;
    columns: 4;
    column-gap: 40px;
    .category-card {
        width: 100%;
        margin: 0 0 20px;
        padding: 10px;
        background-color: #fff;
        break-inside: avoid;
        // max-height: 10rem;
        overflow: hidden;
        cursor: pointer;
        img {
            width: 100%;
            height: auto;
        }
        h2 {
            margin: 10px 0 0;
            padding: 0;
            font-size: 20px;
        }
        p {
            margin: 0;
            padding: 0 0 10px;
            font-size: 16px;
        }
    }
}

@media (max-width: 1200px) {
    .category-card-container {
        column-count: 3;
        width: calc(100% - 40px);
        box-sizing: border-box;
        padding: 20px 20px 20px 0;
    }
}

@media (max-width: 768px) {
    .category-card-container {
        column-count: 2;
    }
}

@media (max-width: 480px) {
    .category-card-container {
        column-count: 1;
    }
}
</style>

<script>
export default {
    data() {
        return {
            categories: [],
            categoriesLength: 1,
        }
    },
    methods: {
        toCategoryPage: function(id) {
            this.$router.push({
                name: 'NotesRound',
                params: {
                    p_id: id,
                }
            })
        }
    },
    mounted() {
        
    },
    created() {
        let _this = this;
        _this.axios.get("/api/getCategories").then(function(res) {
            _this.categories = res.data;
        }).catch(function(err) {
            console.log(err);
        });
    }
}
</script>