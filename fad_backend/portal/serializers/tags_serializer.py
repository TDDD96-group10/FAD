from rest_framework import serializers

class TagsSerializer(serializers.Serializer):
    fadder_tags = serializers.ListField(
        child=serializers.CharField()
    )
    custom_free_text = serializers.ListField(
        child=serializers.CharField()
    )

    tag_groups = serializers.DictField(
        child=serializers.ListField(
            child=serializers.CharField()
        )
    )


    