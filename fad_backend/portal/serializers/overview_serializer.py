from rest_framework import serializers
from .tags_serializer import TagsSerializer




class UserTagsSerializer(serializers.Serializer):
    tagvalues_free_text = serializers.ListField(
        child=serializers.CharField()
    )
    tagvalues_multivalue = serializers.ListField(
        child=serializers.ListField(
            child=serializers.CharField()
    ))

    tags = serializers.ListField(
        child=serializers.CharField()
    )
    

    user_id = serializers.CharField()
    name =  serializers.CharField()
    email = serializers.EmailField()
    phone_number = serializers.CharField()

   

class OverviewSerializer(serializers.Serializer):
    users = UserTagsSerializer(many=True)
    tags = TagsSerializer()
    table_head = serializers.ListField(
        child=serializers.CharField()
    )

    tagvalues_multivalue_name = serializers.DictField(
            child=serializers.ListField(
                child=serializers.CharField()
            )
        )
    

