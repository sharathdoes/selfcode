let testcases = [{"input":{"k":1,"nums":{"n":1,"nums":[1]}},"output":1},{"input":{"k":0,"nums":{"n":1,"nums":[1]}},"output":0},{"input":{"k":2,"nums":{"n":1,"nums":[1]}},"output":1},{"input":{"k":1,"nums":{"n":2,"nums":[1,2]}},"output":1},{"input":{"k":2,"nums":{"n":2,"nums":[1,2]}},"output":3},{"input":{"k":0,"nums":{"n":2,"nums":[1,2]}},"output":0},{"input":{"k":3,"nums":{"n":2,"nums":[1,2]}},"output":3},{"input":{"k":1,"nums":{"n":3,"nums":[1,2,1]}},"output":3},{"input":{"k":2,"nums":{"n":3,"nums":[1,2,1]}},"output":5},{"input":{"k":3,"nums":{"n":3,"nums":[1,2,1]}},"output":6},{"input":{"k":2,"nums":{"n":5,"nums":[1,2,1,2,3]}},"output":7},{"input":{"k":3,"nums":{"n":5,"nums":[1,2,1,2,3]}},"output":10},{"input":{"k":4,"nums":{"n":5,"nums":[1,2,1,2,3]}},"output":11},{"input":{"k":5,"nums":{"n":5,"nums":[1,2,1,2,3]}},"output":12}]
let usercode=` class Solution {
public:
    int atmostk(vector<int>& nums, int k){
        int n=nums.size();
        unordered_map<int,int >mp;
        int start=0, count=0;
        for(int i=0;i<n;i++){
            mp[nums[i]]++;
            while(mp.size()>k){
                mp[nums[start]]--;
                if(mp[nums[start]]==0) mp.erase(nums[start]);
                start++;
            }
            count+=i-start+1;
        }
        return count;
    }
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return atmostk(nums, k)-atmostk(nums, k-1);
    }
    int main(){
        int n;
        cin>>n;
        vector<int>nums(n);
        for(int i=0;i<n;i++){
            cin>>nums[i];
        }
         subarraysWithKDistinct(nums, k)   
        return 0;
    }    
};`